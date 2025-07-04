# -- Inicio da importação de bibliotecas e de outros arquivos. --
from flask import Blueprint, request, jsonify, current_app
from .services import process_chat_message, process_pdf_analysis, process_flashcard_generation

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


# -- Inicio Rota FLASHCARDS -- 
@api_bp.route('/generate-flashcards', methods=['POST'])
def flashcards():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({"erro": "Requisição inválida. O campo 'text' é obrigatório."}), 400
    
    input_text = data['text']
    quantity = data.get('quantity', 3) 
    model = current_app.config['GENAI_MODEL']

    try:
        # passa a quantidade e o input pra função de serviço
        flashcards_list = process_flashcard_generation(model, input_text, quantity)
        return jsonify({"flashcards": flashcards_list})
    
    except ValueError as ve: # erros de validação ou formatação esperada da função de serviço
        print(f"Erro de validação/formatação na geração de flashcards: {ve}")
        return jsonify({"erro": str(ve)}), 400
    except Exception as e: # outros erros inesperados
        print(f"Erro inesperado ao gerar flashcards: {e}")
        return jsonify({"erro": "Falha ao gerar os flashcards."}), 500
# -- Fim Rota FLASHCARDS -- 