# -- Inicio imports -- 

import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from .models import db
from flask_jwt_extended import JWTManager
import google.generativeai as genai

# -- Fim imports --

def create_app():
    # -- Inicialização das variaveis "básicas" --

    load_dotenv()
    app = Flask(__name__)
    __version__ = "0.1.0"
    CORS(app, resources={r"/*": {"origins": "https://devsoftwarefront.onrender.com"}})

    app.config['JWT_SECRET_KEY'] = "devsoftware2025"
    jwt = JWTManager(app)

    # Configuração do banco SQLite
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///historico.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

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