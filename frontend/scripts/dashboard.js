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
