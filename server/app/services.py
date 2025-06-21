import io
import PyPDF2

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