import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_chat_route_success(client, monkeypatch):
    class MockModel:
        def start_chat(self, history=None):
            class MockChatSession:
                def send_message(self, message):
                    class MockResponse:
                        text = "Mocked chat reply"
                    return MockResponse()
            return MockChatSession()

    client.application.config['GENAI_MODEL'] = MockModel()

    response = client.post('/chat', json={"mensagem": "Teste"})
    assert response.status_code == 200
    assert "Mocked chat reply" in response.get_data(as_text=True)

def test_chat_route_missing_field(client):
    response = client.post('/chat', json={"texto": "faltando campo correto"})
    assert response.status_code == 400
    assert "mensagem" in response.get_data(as_text=True)
