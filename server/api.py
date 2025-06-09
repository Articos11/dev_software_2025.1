# Bibliotecas são importadas aqui em cima.
import google.generativeai as genai
import io
import PyPDF2
from flask import Flask, request, jsonify


app = Flask(__name__)

# Todo o consumo da API do gemini está abaixo.
# Chave da API gerada unicamente para teste. Ela será substituida em situações futuras. 
genai.configure(api_key="AIzaSyBww3NdwubM8u22q1O7knDxHLFOclTjzsk")

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


# A declaração da rota transforma toda a função abaixo em uma rota da API. Ou seja, a função só funcionará na rota proposta.
# O método utilizado é POST, ou seja, será enviado até a API. 

# Segue um exemplo do que deve ser escrito no terminal, para a funcionalidade acontecer: 

# curl -X POST http://127.0.0.1:5000/chat \
# -H "Content-Type: application/json" \
# -d '{"mensagem": "Qual a capital do Brasil?"}'
# O prompt acima é um teste apenas. Pode ser mudado livremente para diferentes respostas. 
@app.route('/chat', methods=['POST'])
def chat():

    # Recebemos os dados da requisição HTTP como um JSON e armazenamos em data.
    data = request.get_json()

    # Se data estiver vazia, ou seja, nulo, ou não tivermos uma mensagem em própria no campo, nosso cliente não enviou nada.
    if not data or 'mensagem' not in data:
        return jsonify({"erro": "Requisição inválida"})

    # Armazenamos os dados dentro de uma nova variável.    
    user_message = data['mensagem']

    # Tratamento de erro para evitarmos problemas futuros.
    try:
        # Criamos uma lista de chats, que será trabalhada futuramente no banco de dados POR USUÁRIO.
        chat_session = model.start_chat(history=[])
        # A linha seguinte envia propriamente a mensagem para o gemini. 
        response = chat_session.send_message(user_message)
        # o retorno irá trazer a nós a mensagem do gemini. Como em requisições trabalhamos com JSONs, requisitamos apenas o .text utilizando
        # o jsonify.
        return jsonify({"resposta": response.text})

    # A exceção é criada para caso algum dos fatores acima dê erro.
    except Exception as e:
        print(f"Ocorreu o seguinte erro na API: {e}")
        return jsonify({"erro": "Não foi possível processar a solicitação."})
    

# A declaração da rota transforma toda a função abaixo em uma rota da API. Ou seja, a função só funcionará na rota proposta.
# O método utilizado é POST, ou seja, será enviado até a API. 

# Comando do terminal para execução:

# curl -X POST http://127.0.0.1:5000/analyze-pdf \
# -F "pdf=@C:/Users/vinic/Downloads/ResumeAI.pdf" \
# -F "prompt=Qual a ideia principal deste documento?"
@app.route('/analyze-pdf', methods=['POST'])

def analyze_pdf():
    # checamos se realmente foi enviado algum arquivo na requisição.
    if 'pdf' not in request.files:
        return jsonify({"erro": "Nenhum arquivo PDF enviado."}), 400
    
    # Se há de fato algo no arquivo pdf enviado, podemos continuar o programa, armazenando os dados do PDF numa variável.
    pdf_file = request.files['pdf']

    # É tentado obter qualquer prompt que tenha sido enviado junto com o arquivo pdf aqui. Há um place_holder chamado
    # 'Resuma o conteúdo deste documento para um estudante' só por precaução. 
    prompt = request.form.get('prompt', 'Resuma o conteúdo deste documento para um estudante')

    # Tratamento de erros.
    try: 
        # Usamos a biblioteca PyPDF2 para ler o arquivo PDF. io.BytesIO cria um arquivo de memória a partir dos bytes lidos.
        # Como estamos lendo um arquivo enviado, PyPDF e BytesIO trabalham juntos para não armazenar dados do PDF no servidor, 
        # facilitando o tráfego de informações.
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_file.read()))

        # Criamos uma string vazia para armazenar o conteúdo total do pdf enviado.
        pdf_text = ""
        
        # Um loop para iterar sobre cada página do PDF, extraindo o texto para o pdf_text
        for page in pdf_reader.pages:
            pdf_text += page.extract_text()

        # Se o pdf_text não tiver nada, o arquivo provavelmente não pode ser lido propriamente.
        if not pdf_text:
            return jsonify({"erro": "Não foi possível ler o PDF. O arquivo deve ser enviado novamente."})
        
        # É utilizada uma f string formatada para facilitar a leitura do Gemini sobre todo o arquivo. 
        # O formato é: O prompt do usuário seguido de todo o texto do PDF.
        full_prompt = f"""
        Instrução do usuário: {prompt}

        --- Início do conteúdo do PDF --- 
        {pdf_text}
        --- Fim do conteúdo do PDF ---
        """

        # Enviamos a variável full_prompt para a response, para obtermos o json. 
        response = model.generate_content(full_prompt)
        return jsonify({"resposta": response.text})
    
    # tratamento de erro para caso algo acima não aconteça.
    except Exception as e:
        print(f"Ocorreu o seguinte erro: {e}")
        return jsonify({"erro": "Ocorreu um erro ao processar o arquivo PDF."}), 500


if __name__ == '__main__':
    app.run()