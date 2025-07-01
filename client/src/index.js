const pdfForm = document.getElementById('pdf-form');
const promptInput = document.getElementById('prompt');
const pdfFileInput = document.getElementById('pdf_file');
const loadingDiv = document.getElementById('loading');
const responseContainer = document.getElementById('response-container');

// 1. Seleção dos Elementos do Flashcard
const flashcardContainer = document.querySelector('.flashcard-container');
const flashcard = document.getElementById('flashcard');
const flashcardFrontText = document.getElementById('flashcard-front-text');
const flashcardBackText = document.getElementById('flashcard-back-text');
const navigationButtons = document.querySelector('.navigation');

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const flipButton = document.getElementById('flip-button');

// 2. A lista de flashcards agora começa vazia e será preenchida pela API
let flashcardData = []; 
let currentCardIndex = 0;

// 3. Função para mostrar o card na tela
function showCard(index) {
    // Se não houver cards, esconde a seção de flashcards
    if (flashcardData.length === 0) {
        flashcardContainer.classList.add('hidden');
        navigationButtons.classList.add('hidden');
        return;
    }

    // Mostra a seção de flashcards caso esteja escondida
    flashcardContainer.classList.remove('hidden');
    navigationButtons.classList.remove('hidden');

    // Garante que o card esteja desvirado ao mudar
    if (flashcard.classList.contains('is-flipped')) {
        flashcard.classList.remove('is-flipped');
    }

    // Atualiza o texto da frente e do verso
    const card = flashcardData[index];
    flashcardFrontText.textContent = card.pergunta;
    flashcardBackText.textContent = card.resposta;
}

// 4. Lógica do Formulário (MODIFICADA)
pdfForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    loadingDiv.classList.remove('hidden');
    responseContainer.classList.add('hidden');
    responseContainer.classList.remove('error');

    // Esconde os flashcards antigos enquanto gera novos
    flashcardContainer.classList.add('hidden');
    navigationButtons.classList.add('hidden');

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
        
        if (response.ok) {
            // ATUALIZA O RESUMO
            responseContainer.textContent = result.resumo;
            responseContainer.classList.remove('hidden');

            // ATUALIZA OS FLASHCARDS com os dados da API
            if (result.flashcards && result.flashcards.length > 0) {
                flashcardData = result.flashcards;
                currentCardIndex = 0; // Reseta para o primeiro card
                showCard(currentCardIndex); // Mostra o primeiro card novo
            } else {
                flashcardData = []; // Limpa os cards se a API não retornar nenhum
                showCard(currentCardIndex); // Esconde a seção de cards
            }

        } else {
            responseContainer.textContent = `Erro: ${result.erro}`;
            responseContainer.classList.add('error');
            responseContainer.classList.remove('hidden');
        }

    } catch (error) {
        console.error('Erro na comunicação com a API:', error);
        loadingDiv.classList.add('hidden');
        responseContainer.classList.remove('hidden');
        responseContainer.classList.add('error');
        responseContainer.textContent = 'Não foi possível se conectar ao servidor. Verifique se a API está em execução.';
    }
});

// 5. Eventos dos Botões (sem alterações na lógica)
flipButton.addEventListener('click', () => {
    flashcard.classList.toggle('is-flipped');
});

nextButton.addEventListener('click', () => {
    if (flashcardData.length === 0) return;
    currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
    showCard(currentCardIndex);
});

prevButton.addEventListener('click', () => {
    if (flashcardData.length === 0) return;
    if (currentCardIndex === 0) {
        currentCardIndex = flashcardData.length - 1;
    } else {
        currentCardIndex--;
    }
    showCard(currentCardIndex);
});

// 6. Estado inicial: esconde a seção de flashcards
showCard(currentCardIndex);