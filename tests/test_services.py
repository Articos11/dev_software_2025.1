import pytest 
from app.services import process_chat_message, process_pdf_analysis

class MockModel:

    def start_chat(self, history=None):
        class MockChatSession:
            def send_message(self, message):
                class MockResponse:
                    text = f"Mocked response to: {message}"
                return MockResponse()
        return MockChatSession()
    
    def generate_content(self, prompt):
        class MockResponse:
            text = f"Mocked PDF response to: {prompt}"
        return MockResponse()
    
def test_process_chat_message():
    model = MockModel()
    resultado = process_chat_message(model, "Olá, tudo bem?")
    assert "Mocked response to:" in resultado

def test_process_pdf_analysis():
    from io import BytesIO
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter

    output = BytesIO()
    c = canvas.Canvas(output, pagesize=letter)
    c.drawString(100, 750, "Este é um PDF de teste contendo texto.")
    c.save()
    output.seek(0)

    model = MockModel()
    resultado = process_pdf_analysis(model, output, "Resumo do PDF")
    assert "Mocked PDF response to:" in resultado

    