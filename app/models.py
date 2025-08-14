from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class Historico(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(50), nullable=False)  # 'chat', 'resumo', 'flashcard'
    entrada = db.Column(db.Text, nullable=False)
    resposta = db.Column(db.Text, nullable=False)
    nome_arquivo = db.Column(db.String(255))

class Summary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=True)
    texto = db.Column(db.Text, nullable=False)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('summaries', lazy=True))

    flashcards = db.relationship('Flashcard', back_populates='summary', cascade="all, delete-orphan")

class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pergunta = db.Column(db.String(255), nullable=False)
    resposta = db.Column(db.String(255), nullable=False)
    summary_id = db.Column(db.Integer, db.ForeignKey('summary.id'))
    summary = db.relationship('Summary', back_populates='flashcards')

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='flashcards')

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False, default='estudante')
    password_hash = db.Column(db.String(128), nullable=False)

    # Novo relacionamento
    flashcards = db.relationship('Flashcard', back_populates='user', cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
