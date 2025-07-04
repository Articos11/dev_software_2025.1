import io
import PyPDF2
import json

# -- Inicio do processamento de mensagem de usuário sem PDF -- 
def process_chat_message(model, user_message):
    prompt_sistema = ("Você é um assistente virtual conversando com um usuário em português brasileiro."
                      "A menos que explicitamente dito, não responda em outras linguas."
                      "Responda de forma objetiva, sem análises linguísticas."
                      "Se o prompt do usuário for ambíguo, peça ao usuário para esclarecer"
                      )

    full_message = f"{prompt_sistema}\nUsuário: {user_message}"

    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(full_message)
    return response.text

# -- Fim do processamento de mensagem de usuário sem PDF -- 


# -- Inicio do processamento de mensagem de usuário com PDF -- 
def process_pdf_analysis(model, pdf_file, prompt):

    pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_file.read()))
    pdf_text = ""

    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text:
            pdf_text += page_text

    if not pdf_text.strip():
        raise ValueError("O conteúdo do PDF está vazio ou ilegível.")
    
    full_prompt = f"""
    Instrução do usuário: {prompt}

    --- Início do conteúdo do PDF --- 
    {pdf_text}
    --- Fim do conteúdo do PDF ---
    """

    response = model.generate_content(full_prompt)
    return response.text

# -- Fim do processamento de mensagem de usuário com PDF -- 


# --- INÍCIO da nova função para geração de flashcards ---
def process_flashcard_generation(model, input_text, quantity=3):

    if not input_text or not input_text.strip():
        raise ValueError("O resumo do PDF está vazio ou não pôde ser processado para gerar flashcards.")

    # validação da quantidade no backend
    try:
        quantity = int(quantity)
        if not (1 <= quantity <= 10):
            raise ValueError("A quantidade de flashcards deve ser entre 1 e 10.")
    except (ValueError, TypeError):
        raise ValueError("A quantidade de flashcards fornecida é inválida.")

    # ajuste o prompt para usar a quantidade dinâmica
    full_prompt = f"""
    Com base no resumo a seguir, gere {quantity} flashcards. Cada flashcard deve ter uma pergunta e uma resposta.
    **As perguntas devem ser de nível universitário e objetivas. Elas devem focar em conceitos, definições avançadas, relações diretas, princípios fundamentais, métodos específicos ou a distinção concisa entre elementos.** Evite perguntas que exijam análises subjetivas ou discussões aprofundadas. Formule as perguntas de forma direta, buscando respostas concisas, mas informativas.

    Formate a saída EXATAMENTE como uma lista de objetos JSON, onde cada objeto tem as chaves "pergunta" e "resposta".

    Exemplo de formato esperado para {quantity} flashcards:
    [
    {{"pergunta": "Qual a distinção fundamental entre o positivismo e o interpretativismo nas metodologias de pesquisa em ciências sociais?", "resposta": "O positivismo busca leis universais e objetividade, usando métodos quantitativos e replicáveis. O interpretativismo foca na compreensão subjetiva dos fenômenos sociais, utilizando métodos qualitativos para explorar significados e contextos."}},
    {{"pergunta": "Qual o princípio da 'separação de poderes' e sua função essencial em um sistema democrático moderno?", "resposta": "O princípio da separação de poderes divide as funções governamentais em legislativa (criar leis), executiva (implementar leis) e judiciária (julgar), com o objetivo de evitar a concentração de poder e garantir o equilíbrio e os freios e contrapesos na governança democrática."}},
    {{"pergunta": "O que caracteriza o processo de 'acidificação dos oceanos' e qual sua principal consequência biológica direta para a vida marinha?", "resposta": "A acidificação dos oceanos é a redução do pH da água do mar devido à absorção de dióxido de carbono atmosférico. Sua principal consequência biológica direta é a dificuldade de organismos marinhos como corais e moluscos formarem e manterem suas conchas e esqueletos de carbonato de cálcio."}},
    // ... (se quantity > 3, adicione mais exemplos que mantenham o nível e o estilo objetivo)
    {{"pergunta": "...", "resposta": "..."}}
    ]

    Texto/Tópico para flashcards:
    {input_text}
    """

    try:
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(full_prompt)

        #pra limpar a resposta tirando os markdowns e outros simbolos
        response_text_cleaned = response.text.strip()
        if response_text_cleaned.startswith("```json"):
            response_text_cleaned = response_text_cleaned[len("```json"):].strip()
        if response_text_cleaned.endswith("```"):
            response_text_cleaned = response_text_cleaned[:-len("```")].strip()
        
        flashcards = json.loads(response_text_cleaned)

        if not isinstance(flashcards, list):
            raise ValueError("A resposta da API não é uma lista JSON válida.")

        for card in flashcards:
            if not isinstance(card, dict) or "pergunta" not in card or "resposta" not in card:
                raise ValueError("Um ou mais flashcards não estão no formato esperado (pergunta/resposta).")
        
        return flashcards

    except json.JSONDecodeError as e:
        print(f"Erro: A resposta do Gemini não pôde ser parseada como JSON: {response_text_cleaned}. Erro: {e}")
        raise ValueError("A API não retornou flashcards no formato JSON esperado.")
    except Exception as e:
        print(f"Erro inesperado durante a geração de flashcards: {e}")
        raise Exception("Ocorreu um erro ao processar a solicitação de flashcards.")

# --- FIM da nova função para geração de flashcards ---