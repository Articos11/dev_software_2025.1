import pytest
from app import create_app, db
from app.models import Flashcard, Summary

@pytest.fixture
def app_context():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app_context):
    return app_context.test_client()

def test_create_flashcard(app_context):
    flashcard = Flashcard(pergunta="Pergunta de teste", resposta="Resposta de teste")
    db.session.add(flashcard)
    db.session.commit()

    result = Flashcard.query.first()
    assert result is not None
    assert result.pergunta == "Pergunta de teste"
    assert result.resposta == "Resposta de teste"

def test_create_summary(app_context):
    summary = Summary(texto="Resumo de teste")
    db.session.add(summary)
    db.session.commit()

    result = Summary.query.first()
    assert result is not None
    assert result.texto == "Resumo de teste"

def test_flashcard_summary_relationship(app_context):
    summary = Summary(texto="Resumo com flashcards")
    flashcard1 = Flashcard(pergunta="Q1", resposta="A1", summary=summary)
    flashcard2 = Flashcard(pergunta="Q2", resposta="A2", summary=summary)

    db.session.add(summary)
    db.session.add(flashcard1)
    db.session.add(flashcard2)
    db.session.commit()

    retrieved_summary = Summary.query.first()
    assert len(retrieved_summary.flashcards) == 2
    assert retrieved_summary.flashcards[0].pergunta == "Q1"
    assert retrieved_summary.flashcards[1].pergunta == "Q2"
