# -- Inicio da importação de bibliotecas e de outros arquivos. --
from flask import Blueprint, request, jsonify, current_app
from .services import process_chat_message, process_pdf_analysis, process_flashcard_generation
import logging # Importe o módulo logging

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
api_bp = Blueprint('api', __name__)


# -- Inicio das rotas --

# -- Rota Chat --
@api_bp.route('/chat', methods=['POST'])
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
        return jsonify({'resposta': resposta})
    except Exception as e:
        # Use logger.error para erros que impedem a operação
        logger.error(f'Erro no chat: {e}', exc_info=True) # exc_info=True inclui o traceback no log
        return jsonify({"erro": "Falha ao processar a solicitação de chat."}), 500

# -- Fim Rota Chat --


# -- Inicio Rota PDF --

@api_bp.route('/analyze-pdf', methods=["POST"])
def analyze_pdf():
    # log.info('Requisição /analyze-pdf recebida.')
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
        return jsonify({"flashcards": flashcards_list})

    except ValueError as ve: # erros de validação ou formatação esperada da função de serviço
        logger.warning(f"Erro de validação/formatação na geração de flashcards: {ve}")
        return jsonify({"erro": str(ve)}), 400
    except Exception as e: # outros erros inesperados
        logger.error(f"Erro inesperado ao gerar flashcards: {e}", exc_info=True)
        return jsonify({"erro": "Falha ao gerar os flashcards."}), 500
# -- Fim Rota FLASHCARDS --