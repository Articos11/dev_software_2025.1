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


// 1. Dados dos Flashcards
const flashcardData = [
    {
        pergunta: "O que significa a sigla 'DOM' em JavaScript?",
        resposta: "Document Object Model. É uma interface de programação para documentos HTML e XML."
    },
    {
        pergunta: "Qual a diferença entre '==' e '==='?",
        resposta: "'==' compara apenas o valor (com coerção de tipo), enquanto '===' compara o valor E o tipo, sem coerção."
    },
    {
        pergunta: "O que é 'Hoisting' em JavaScript?",
        resposta: "É o comportamento do JavaScript de mover declarações de variáveis e funções para o topo de seu escopo antes da execução do código."
    },
    {
        pergunta: "Para que serve o método 'map()' em um array?",
        resposta: "Ele cria um novo array populado com os resultados da chamada de uma função para cada elemento do array."
    }
];

// 2. Seleção dos Elementos do Flashcard
const flashcard = document.getElementById('flashcard');
const flashcardFrontText = document.getElementById('flashcard-front-text');
const flashcardBackText = document.getElementById('flashcard-back-text');

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const flipButton = document.getElementById('flip-button');

// 3. Lógica de Controle
let currentCardIndex = 0;

function showCard(index) {
    // Garante que o card esteja desvirado ao mudar
    if (flashcard.classList.contains('is-flipped')) {
        flashcard.classList.remove('is-flipped');
    }

    // Atualiza o texto da frente e do verso
    flashcardFrontText.textContent = flashcardData[index].pergunta;
    flashcardBackText.textContent = flashcardData[index].resposta;
}

// 4. Adicionar Eventos aos Botões
flipButton.addEventListener('click', () => {
    flashcard.classList.toggle('is-flipped');
});

nextButton.addEventListener('click', () => {
    // Avança para o próximo card, voltando ao primeiro se chegar no fim
    currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
    showCard(currentCardIndex);
});

prevButton.addEventListener('click', () => {
    // Retorna ao card anterior, indo para o último se estiver no primeiro
    if (currentCardIndex === 0) {
        currentCardIndex = flashcardData.length - 1;
    } else {
        currentCardIndex--;
    }
    showCard(currentCardIndex);
});

// 5. Mostrar o primeiro card ao carregar a página
showCard(currentCardIndex);