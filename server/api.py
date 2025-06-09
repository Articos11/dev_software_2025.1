# Bibliotecas são importadas aqui em cima.
import google.generativeai as genai
import io
import PyPDF2
from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()
app = Flask(__name__)

# Todo o consumo da API do gemini está abaixo.
# Chave da API gerada unicamente para teste. Ela será substituida em situações futuras. 
api_key = os.getenv("GEMINI_API_KEY")
CORS(app)

if not api_key:
    raise ValueError("A chave não foi encontrada.")

genai.configure(api_key=api_key)


# Configurações básicas da API. Já veio assim do snipet da própria API, então eu não mexi. 
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash-latest",
    generation_config=generation_config,
)

# Criação das rotas. Para o backend, é onde as informações são enviadas e trabalhadas no navegador. 
# A rota chat existe unicamente para testarmos prompts diretos, como se estivessemos nos comunicando com o GPT.

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()

    if not data or 'mensagem' not in data:
        return jsonify({"erro": "Requisição inválida"})
    user_message = data['mensagem']

    try:
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(user_message)
        return jsonify({"resposta": response.text})
    
    except Exception as e:
        print(f"Ocorreu o seguinte erro na API: {e}")
        return jsonify({"erro": "Não foi possível processar a solicitação."})
    

# A declaração da rota transforma toda a função abaixo em uma rota da API. Ou seja, a função só funcionará na rota proposta.
# O método utilizado é POST, ou seja, será enviado até a API. 

@app.route('/analyze-pdf', methods=['POST'])
def analyze_pdf():
    if 'pdf' not in request.files:
        return jsonify({"erro": "Nenhum arquivo PDF enviado."}), 400
    
    pdf_file = request.files['pdf']

    prompt = request.form.get('prompt', 'Resuma o conteúdo deste documento para um estudante')

    try: 
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_file.read()))

        pdf_text = ""
        for page in pdf_reader.pages:
            pdf_text += page.extract_text()

        if not pdf_text:
            return jsonify({"erro": "Não foi possível ler o PDF. O arquivo deve ser enviado novamente."})
        
        full_prompt = f"""
        Instrução do usuário: {prompt}

        --- Início do conteúdo do PDF --- 
        {pdf_text}
        --- Fim do conteúdo do PDF ---
        """

        response = model.generate_content(full_prompt)
        return jsonify({"resposta": response.text})
    
    except Exception as e:
        print(f"Ocorreu o seguinte erro: {e}")
        return jsonify({"erro": "Ocorreu um erro ao processar o arquivo PDF."}), 500


if __name__ == '__main__':
    app.run()