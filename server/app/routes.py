# -- Inicio da importação de bibliotecas e de outros arquivos. --
from flask import Blueprint, request, jsonify, current_app
from .services import process_chat_message, process_pdf_analysis

# -- Fim da importação de bibliotecas e de outros arquivos. --

# -- Definição do arquivo como uma blueprint. --
api_bp = Blueprint('api', __name__)


# -- Inicio das rotas --

# -- Rota Chat -- 
@api_bp.route('/chat', methods=['POST'])
def chat():

    data = request.get_json()

    if not data or 'mensagem' not in data:
        return jsonify({"erro": "Requisição inválida. Campo 'mensagem' é obrigatório"}), 400
    
    user_message = data['mensagem']
    model = current_app.config['GENAI_MODEL']

    try:
        resposta = process_chat_message(model, user_message)
        return jsonify({'resposta': resposta})
    except Exception as e:
        print(f'Erro no chat: {e}')
        return jsonify({"erro": "Falha ao processar a solicitação de chat."}), 500
    
# -- Fim Rota Chat --


# -- Inicio Rota PDF -- 
    
@api_bp.route('/analyze-pdf', methods=["POST"])
def analyze_pdf():
    if 'pdf' not in request.files:
        return jsonify({"erro": "Nenhum arquivo PDF enviado."}), 400
    
    pdf_file = request.files['pdf']
    prompt = request.form.get('prompt', "Resuma o conteúdo deste documento para um estudante")
    model = current_app.config['GENAI_MODEL']

    try:
        resposta = process_pdf_analysis(model, pdf_file, prompt)
        return jsonify({"resposta": resposta})

    except Exception as e:
        print(f"Erro ao processar PDF: {e}")
        return jsonify({"erro": "Falha ao processar o arquivo PDF."}), 500
    
# -- Fim Rota PDF -- 