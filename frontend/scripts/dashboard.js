// ===== SHOW SECTIONS BUTTONS =====
const fichasSectionBtn = document.getElementById("fichasSectionBtn");
const atendimentosSectionBtn = document.getElementById("atendimentosSectionBtn");
const fichasSection = document.getElementById("fichasSection");
const atendimentosSection = document.getElementById("atendimentosSection");

function showSection(sectionToShow, sectionToHide) {
    sectionToShow.classList.remove('hidden');
    sectionToHide.classList.add('hidden');
}

fichasSectionBtn.addEventListener('click', () => {
    showSection(fichasSection, atendimentosSection);
});
atendimentosSectionBtn.addEventListener('click', () => {
    showSection(atendimentosSection, fichasSection);
});

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById("searchPaciente");
const fichaCards = document.querySelectorAll('[data-nome]');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    fichaCards.forEach(card => {
        const nome = card.dataset.nome.toLowerCase();
        const telefone = card.dataset.telefone.toLowerCase();
        const profissao = card.dataset.profissao.toLowerCase();

        if (nome.includes(searchTerm) || telefone.includes(searchTerm) || profissao.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// ===== SHOW DETAILS FICHA BUTTON =====
const detalhesFichaButtons = document.querySelectorAll('.detalhes-ficha');

detalhesFichaButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const fichaCard = button.closest('[data-nome]');
        const _id = fichaCard.dataset.id;

        try {
            const dados = await fetch(`http://localhost:3000/ficha/${_id}`);
            
            if (!dados.ok) {
                const erro = await dados.text();
                console.error('Resposta do servidor:', erro);
                throw new Error(`Erro ${dados.status}: ${dados.statusText}`);
            }
            
            const dadosJson = await dados.json();
            console.log(dadosJson) //debug
        } catch (error) {
            console.error('Erro completo:', error);
        }
    });
});
