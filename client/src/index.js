const pdfForm = document.getElementById('pdf-form');
const promptInput = document.getElementById('prompt');
const pdfFileInput = document.getElementById('pdf_file');
const loadingDiv = document.getElementById('loading');
const responseContainer = document.getElementById('response-container');

pdfForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            loadingDiv.classList.remove('hidden');
            responseContainer.classList.add('hidden');
            responseContainer.classList.remove('error');

            const formData = new FormData();
            formData.append('prompt', promptInput.value);
            formData.append('pdf', pdfFileInput.files[0]);

            try {
                const response = await fetch('http://127.0.0.1:5000/analyze-pdf', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                loadingDiv.classList.add('hidden');
                responseContainer.classList.remove('hidden');

                if (response.ok) {
                    responseContainer.textContent = result.resposta;
                } else {
                    responseContainer.textContent = `Erro: ${result.erro}`;
                    responseContainer.classList.add('error');
                }

            } catch (error) {
                console.error('Erro na comunicação com a API:', error);
                loadingDiv.classList.add('hidden');
                responseContainer.classList.remove('hidden');
                responseContainer.classList.add('error');
                responseContainer.textContent = 'Não foi possível se conectar ao servidor. Verifique se a API está em execução.';
            }
        });