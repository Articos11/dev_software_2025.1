# -- Inicio imports -- 

import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# -- Fim imports --

def create_app():
    # -- Inicialização das variaveis "básicas" --

    load_dotenv()
    app = Flask(__name__)
    CORS(app)

    api_key = os.getenv("API_KEY")
    if not api_key:
        raise ValueError("A chave não foi encontrada no .env")
    
    # -- Fim da inicialização das variaveis "básicas" -- 
    

    # -- Modelo da google sendo instânciado --
    from google.generativeai import GenerativeModel
    genai.configure(api_key=api_key)
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
    }
    model = GenerativeModel(
        model_name="gemini-1.5-flash-latest",
        generation_config=generation_config,
    )
    app.config['GENAI_MODEL'] = model

    # -- Fim da instância do modelo da google

    
    # -- Registrar as rotas (Blueprints) --
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    # -- Fim do registro das rostas (Blueprints) -- 

    return app