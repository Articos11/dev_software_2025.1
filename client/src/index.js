// elementos para o formulário de análise de PDF
const pdfForm = document.getElementById('pdf-form');
const promptInput = document.getElementById('prompt');
const pdfFileInput = document.getElementById('pdf_file');
const loadingDiv = document.getElementById('loading');
const responseContainer = document.getElementById('response-container');
const pdfFlashcardSeparator = document.getElementById('pdf-flashcard-separator'); 

// elementos pra controle da geração de Flashcards, mudei um pouco a lógica
const flashcardQuantityGroup = document.getElementById('flashcard-quantity-group');
const flashcardQuantityInput = document.getElementById('flashcard-quantity');
const generateFromSummaryButton = document.getElementById('generate-from-summary-button');

// elementos pra feedback dos Flashcards
const loadingFlashcardDiv = document.getElementById('loading-flashcard');
const responseFlashcardError = document.getElementById('response-flashcard-error');

// elementos para exibição e navegação dos Flashcards
const flashcardDisplaySection = document.getElementById('flashcard-display-section'); // a seção completa do flashcard
const flashcardContainer = document.querySelector('.flashcard-container'); // o card em si
const flashcard = document.getElementById('flashcard');
const flashcardFrontText = document.getElementById('flashcard-front-text');
const flashcardBackText = document.getElementById('flashcard-back-text');
const navigationButtons = document.querySelector('.navigation'); // e os botões de navegação

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const flipButton = document.getElementById('flip-button');

// --- Variáveis de Estado ---
let flashcardData = [];
let currentCardIndex = 0;
let latestPdfSummary = ''; // pra armazenar o último resumo do PDF (usei isso por enquanto que não temos banco de dados)

// -- Funções --

//esse comentario de baixo é só pra dizer o que é esperado em cada entrada dos parametros e qual o comportamento

/**
 * exibe ou esconde um elemento e adiciona/remove a classe 'error'.
 * @param {HTMLElement} element o elemento HTML a ser manipulado.
 * @param {boolean} show se true, remove 'hidden'. Se false, adiciona 'hidden'.
 * @param {boolean} isError se true, adiciona 'error'. Se false, remove 'error'.
 */
function toggleDisplayAndError(element, show, isError = false) {
    if (element) {
        if (show) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden'); 
        }
        if (isError) {
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }
    }
}

/**
 * atualiza e exibe o flashcard atual na interface.
 * esconde a seção de flashcards se não houver dados.
 * @param {number} index o índice do flashcard a ser exibido.
 */
function showCard(index) {
    if (flashcardData.length === 0) {
        toggleDisplayAndError(flashcardContainer, false);
        toggleDisplayAndError(navigationButtons, false);
        return;
    }

    toggleDisplayAndError(flashcardContainer, true);
    toggleDisplayAndError(navigationButtons, true);

    if (flashcard.classList.contains('is-flipped')) {
        flashcard.classList.remove('is-flipped');
    }

    const card = flashcardData[index];
    flashcardFrontText.textContent = card.pergunta;
    flashcardBackText.textContent = card.resposta;
}   

/**
 * limpa e esconde todas as áreas de resposta e erro, incluindo novas seções.
 * @param {'pdf' | 'flashcard_generation' | 'flashcard_display' | null} activeSection qual seção deve estar "ativa" (visível).
 */
function clearAllResponseAreas(activeSection = null) {
    // esconder tudo por padrão, a menos que seja a seção ativa
    toggleDisplayAndError(loadingDiv, false);
    toggleDisplayAndError(responseContainer, false);
    responseContainer.textContent = '';
    
    // esconder elementos de flashcard controláveis
    toggleDisplayAndError(pdfFlashcardSeparator, false);
    toggleDisplayAndError(flashcardQuantityGroup, false);
    toggleDisplayAndError(generateFromSummaryButton, false);
    toggleDisplayAndError(loadingFlashcardDiv, false);
    toggleDisplayAndError(responseFlashcardError, false);
    responseFlashcardError.textContent = '';
    toggleDisplayAndError(flashcardDisplaySection, false); // esconde a seção completa do flashcard

    flashcardData = [];
    currentCardIndex = 0;

    // lógica para mostrar seções ativas, se aplicável
    if (activeSection === 'pdf') {
        // nada específico aqui, pois 'responseContainer' será mostrado em seguida
        latestPdfSummary = ''; // garante que o resumo seja limpo ao iniciar nova análise
    }
    // 'flashcard_generation' e 'flashcard_display' são controlados separadamente no fluxo
}

/**
 * função genérica para chamar a API de geração de flashcards.
 * @param {string} sourceText o texto base para gerar os flashcards.
 * @param {number} quantity a quantidade de flashcards a serem gerados.
 */
async function generateFlashcardsApiCall(sourceText, quantity) {
    clearAllResponseAreas(null); // limpa TUDO antes de começar uma nova geração de flashcards
    toggleDisplayAndError(loadingFlashcardDiv, true);

    // garante que o input de quantidade e o botão estejam visíveis durante o loading
    toggleDisplayAndError(pdfFlashcardSeparator, true);
    toggleDisplayAndError(flashcardQuantityGroup, true);
    toggleDisplayAndError(generateFromSummaryButton, true);

    const validatedQuantity = Math.max(1, Math.min(10, parseInt(quantity) || 3));

    if (!sourceText.trim()) {
        toggleDisplayAndError(loadingFlashcardDiv, false);
        responseFlashcardError.textContent = "Nenhum resumo de PDF disponível para gerar flashcards. Por favor, analise um PDF primeiro.";
        toggleDisplayAndError(responseFlashcardError, true, true);
        
        // garante que a seção de exibição de flashcards fique oculta se não houver resumo
        toggleDisplayAndError(flashcardDisplaySection, false);
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/generate-flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: sourceText, quantity: validatedQuantity }),
        });

        const result = await response.json();
        toggleDisplayAndError(loadingFlashcardDiv, false);
        
        if (response.ok) {
            if (result.flashcards && Array.isArray(result.flashcards) && result.flashcards.length > 0) {
                flashcardData = result.flashcards;
                currentCardIndex = 0;
                showCard(currentCardIndex); // atualiza o conteúdo do card e navegação
                toggleDisplayAndError(flashcardDisplaySection, true); // MOSTRA A SEÇÃO COMPLETA DOS FLASHCARDS
                toggleDisplayAndError(responseFlashcardError, false);
            } else {
                flashcardData = [];
                showCard(currentCardIndex); // esconde o card e navegação
                toggleDisplayAndError(flashcardDisplaySection, false); // garante que a seção completa esteja escondida
                responseFlashcardError.textContent = "A API não retornou flashcards válidos para o texto fornecido. Tente um texto/tópico diferente.";
                toggleDisplayAndError(responseFlashcardError, true, true);
            }
        } else {
            flashcardData = []; // limpa dados anteriores
            showCard(currentCardIndex); // esconde card e navegação
            toggleDisplayAndError(flashcardDisplaySection, false); // garante que a seção completa esteja escondida
            responseFlashcardError.textContent = `Erro: ${result.erro || 'Erro desconhecido da API.'}`;
            toggleDisplayAndError(responseFlashcardError, true, true);
        }

    } catch (error) {
        console.error('Erro na comunicação com a API de Flashcards:', error);
        toggleDisplayAndError(loadingFlashcardDiv, false);
        responseFlashcardError.textContent = 'Não foi possível se conectar ao servidor de flashcards. Verifique se a API está em execução.';
        toggleDisplayAndError(responseFlashcardError, true, true);
        
        flashcardData = []; // limpa dados anteriores
        showCard(currentCardIndex); // esconde card e navegação
        toggleDisplayAndError(flashcardDisplaySection, false); // garante que a seção completa esteja escondida
    }
}


// -- Lógica Principal --

// lógica do formulário de ANÁLISE DE PDF
pdfForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // limpa todas as áreas, preparando para o resumo do PDF
    clearAllResponseAreas(null); // limpa TUDO no início
    toggleDisplayAndError(loadingDiv, true);
    
    // garante que elementos de flashcard fiquem escondidos ao iniciar análise de PDF
    toggleDisplayAndError(flashcardQuantityGroup, false);
    toggleDisplayAndError(generateFromSummaryButton, false);
    toggleDisplayAndError(pdfFlashcardSeparator, false);
    
    const formData = new FormData();
    formData.append('prompt', promptInput.value);
    formData.append('pdf', pdfFileInput.files[0]);

    try {
        const response = await fetch('http://127.0.0.1:5000/api/analyze-pdf', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        toggleDisplayAndError(loadingDiv, false);
        
        if (response.ok) {
            responseContainer.textContent = result.resposta;
            toggleDisplayAndError(responseContainer, true);
            latestPdfSummary = result.resposta; // SALVA O RESUMO DO PDF
            
            // MOSTRA as opções de flashcard APENAS SE o resumo foi gerado com sucesso
            toggleDisplayAndError(pdfFlashcardSeparator, true);
            toggleDisplayAndError(flashcardQuantityGroup, true);
            toggleDisplayAndError(generateFromSummaryButton, true);
        } else {
            responseContainer.textContent = `Erro: ${result.erro}`;
            toggleDisplayAndError(responseContainer, true, true);
            latestPdfSummary = ''; // limpa o resumo em caso de erro
            // garante que as opções de flashcard fiquem escondidas em caso de erro
            toggleDisplayAndError(pdfFlashcardSeparator, false);
            toggleDisplayAndError(flashcardQuantityGroup, false);
            toggleDisplayAndError(generateFromSummaryButton, false);
        }

    } catch (error) {
        console.error('Erro na comunicação com a API de PDF:', error);
        toggleDisplayAndError(loadingDiv, false);
        responseContainer.textContent = 'Não foi possível se conectar ao servidor para análise de PDF. Verifique se a API está em execução.';
        toggleDisplayAndError(responseContainer, true, true);
        latestPdfSummary = '';
        toggleDisplayAndError(pdfFlashcardSeparator, false);
        toggleDisplayAndError(flashcardQuantityGroup, false);
        toggleDisplayAndError(generateFromSummaryButton, false);
    }
});


// lógica para gerar flashcards do resumo do PDF
generateFromSummaryButton.addEventListener('click', async () => {
    const quantity = flashcardQuantityInput.value;
    if (latestPdfSummary) {
        generateFlashcardsApiCall(latestPdfSummary, quantity);
    } else {
        responseFlashcardError.textContent = "Nenhum resumo de PDF disponível para gerar flashcards. Por favor, analise um PDF primeiro.";
        toggleDisplayAndError(responseFlashcardError, true, true);
        toggleDisplayAndError(flashcardDisplaySection, false); // garante que a seção esteja escondida
    }
});

// eventos dos botões de navegação dos flashcards
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

// --- Inicialização ---
// esconde tudo no carregamento inicial da página para um estado limpo
clearAllResponseAreas(null);