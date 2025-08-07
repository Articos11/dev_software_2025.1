# -- Inicio da importação de bibliotecas e de outros arquivos. --
from flask import Blueprint, request, jsonify, current_app
from .services import process_chat_message, process_pdf_analysis, process_flashcard_generation
import logging # Importe o módulo logging
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from .models import db, Historico, Summary, User, Flashcard 
from datetime import datetime

# -- Fim da importação de bibliotecas e de outros arquivos. --

# -- Configuração do Logging --

# Configura o logger para exibir mensagens a partir do nível INFO
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    handlers=[
                        logging.FileHandler("app.log"), # Salva logs em um arquivo chamado app.log
                        logging.StreamHandler() # Também mostra os logs no console
                    ])

# Obtém uma instância do logger para este módulo (routes.py)
# Isso permite que o log saiba de onde a mensagem veio (ex: api.chat)
logger = logging.getLogger(__name__)

# -- Definição do arquivo como uma blueprint. --
api_bp = Blueprint('api_blueprint', __name__)


# -- Inicio das rotas --

# -- Rota Chat --
@api_bp.route('/chat', methods=['POST'])
# @jwt_required()
def chat():
    # log.info('Requisição /chat recebida.') # Exemplo de log de informação
    data = request.get_json()

    if not data or 'mensagem' not in data:
        # Use logger.warning para avisos de requisições inválidas
        logger.warning("Requisição inválida para /chat: Campo 'mensagem' é obrigatório.")
        return jsonify({"erro": "Requisição inválida. Campo 'mensagem' é obrigatório"}), 400

    user_message = data['mensagem']
    model = current_app.config['GENAI_MODEL']

    try:
        logger.info(f"Processando mensagem de chat: '{user_message[:50]}...'") # Log da mensagem de entrada
        resposta = process_chat_message(model, user_message)
        logger.info("Chat processado com sucesso.") # Log de sucesso

        historico = Historico(tipo="chat", entrada=user_message, resposta=resposta)
        db.session.add(historico)
        db.session.commit()

        return jsonify({'resposta': resposta})

    except Exception as e:
        # Use logger.error para erros que impedem a operação
        logger.error(f'Erro no chat: {e}', exc_info=True) # exc_info=True inclui o traceback no log
        return jsonify({"erro": "Falha ao processar a solicitação de chat."}), 500

# -- Fim Rota Chat --


# -- Inicio Rota PDF --

@api_bp.route('/analyze-pdf', methods=["POST"])
# @jwt_required()
def analyze_pdf():
    print(request.headers)
    if 'pdf' not in request.files:
        logger.warning("Requisição inválida para /analyze-pdf: Nenhum arquivo PDF enviado.")
        return jsonify({"erro": "Nenhum arquivo PDF enviado."}), 400

    pdf_file = request.files['pdf']
    # .get() é mais seguro para evitar KeyError se 'prompt' não estiver lá
    prompt = request.form.get('prompt', "Resuma o conteúdo deste documento para um estudante")
    model = current_app.config['GENAI_MODEL']

    try:
        logger.info(f"Processando análise de PDF com prompt: '{prompt[:50]}...'")
        resposta = process_pdf_analysis(model, pdf_file, prompt)
        logger.info("PDF analisado com sucesso.")

        historico = Historico(
            tipo="resumo",
            entrada=prompt,
            resposta=resposta,
            nome_arquivo=pdf_file.filename
        )
        db.session.add(historico)
        db.session.commit()

        return jsonify({"resposta": resposta})

    except Exception as e:
        logger.error(f"Erro ao processar PDF: {e}", exc_info=True)
        return jsonify({"erro": "Falha ao processar o arquivo PDF."}), 500

# -- Fim Rota PDF --


# -- Inicio Rota FLASHCARDS --
@api_bp.route('/generate-flashcards', methods=['POST'])
def flashcards():
    # log.info('Requisição /generate-flashcards recebida.')
    data = request.get_json()

    if not data or 'text' not in data:
        logger.warning("Requisição inválida para /generate-flashcards: O campo 'text' é obrigatório.")
        return jsonify({"erro": "Requisição inválida. O campo 'text' é obrigatório."}), 400

    input_text = data['text']
    quantity = data.get('quantity', 3)
    model = current_app.config['GENAI_MODEL']

    try:
        logger.info(f"Gerando {quantity} flashcards para o texto: '{input_text[:50]}...'")
        flashcards_list = process_flashcard_generation(model, input_text, quantity)
        logger.info("Flashcards gerados com sucesso.")

        historico = Historico(
            tipo="flashcard",
            entrada=input_text,
            resposta=str(flashcards_list),
            quantidade=quantity
        )
        db.session.add(historico)
        db.session.commit()

        return jsonify({"flashcards": flashcards_list})


    except ValueError as ve: # erros de validação ou formatação esperada da função de serviço
        logger.warning(f"Erro de validação/formatação na geração de flashcards: {ve}")
        return jsonify({"erro": str(ve)}), 400
    except Exception as e: # outros erros inesperados
        logger.error(f"Erro inesperado ao gerar flashcards: {e}", exc_info=True)
        return jsonify({"erro": "Falha ao gerar os flashcards."}), 500
# -- Fim Rota FLASHCARDS --


# -- Início Rota SIGNUP -- 

@api_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    required_fields = ['name', 'email', 'password', 'role']
    if not data or any(field not in data for field in required_fields):
        return jsonify({"erro": "Campos obrigatórios: name, email, password e role."}), 400

    name = data['name']
    email = data['email']
    password = data['password']
    role = data['role']

    if User.query.filter_by(email=email).first():
        return jsonify({"erro": "Usuário já existe."}), 400

    novo_usuario = User(name=name, email=email, role=role)
    novo_usuario.set_password(password)

    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify({"msg": "Usuário criado com sucesso."}), 201


# -- Fim Rota SIGNUP -- 

# -- Início rota LOGIN --
@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"erro": "Email e senha são obrigatórios."}), 400

    email = data['email']
    password = data['password']

    usuario = User.query.filter_by(email=email).first()

    if not usuario or not usuario.check_password(password):
        return jsonify({"erro": "Credenciais inválidas."}), 401

    access_token = create_access_token(identity=usuario.id)  # Pode usar id ou email

    response_data = {
        "msg": "Login realizado com sucesso.",
        "access_token": access_token,
        "user": {
            "id": usuario.id,
            "email": usuario.email,
            "name": usuario.name,
            "role": usuario.role
        }
    }
    
    logger.info(f"Resposta /login: {response_data}")

    return jsonify(response_data), 200



# -- Fim rota LOGIN --

# -- Início rota SUMÁRIOS -- 

@api_bp.route('/save-summary', methods=['POST'])
def save_summary():
    data = request.get_json()

    user_id = data.get('user_id')  # Agora pega do JSON enviado
    if not user_id:
        return jsonify({"erro": "ID do usuário é obrigatório."}), 400

    texto = data.get('texto')
    titulo = data.get('titulo', 'Resumo sem título')

    if not texto:
        return jsonify({"erro": "Texto do resumo é obrigatório."}), 400

    novo_summary = Summary(
        texto=texto,
        user_id=user_id,
        titulo=titulo,
        data_criacao=datetime.utcnow()
    )
    db.session.add(novo_summary)
    db.session.commit()

    return jsonify({"msg": "Resumo salvo com sucesso.", "summary_id": novo_summary.id}), 201
# -- Fim Rota SUMÁRIOS --

# -- Inicio Rotas BUSCASUMÁRIO -- 

@api_bp.route('/my-summaries', methods=['GET'])
def get_my_summaries():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"erro": "ID do usuário é obrigatório."}), 400

    summaries = Summary.query.filter_by(user_id=user_id).order_by(Summary.data_criacao.desc()).all()

    result = []
    for s in summaries:
        result.append({
            "id": s.id,
            "title": s.titulo,
            "date": s.data_criacao.strftime("%d/%m/%Y"),
            "icon": "src/assets/Ativo 29.svg"  # ajuste conforme sua lógica de ícones
        })

    return jsonify(result), 200

# -- Fim da rota -- 