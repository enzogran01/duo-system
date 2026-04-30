// ===== SHOW SECTIONS BUTTONS =====
const fichasSectionBtn = document.getElementById("fichasSectionBtn");
const atendimentosSectionBtn = document.getElementById("atendimentosSectionBtn");
const fichasSection = document.getElementById("fichasSection");
const atendimentosSection = document.getElementById("atendimentosSection");

function showSection(sectionToShow, sectionToHide) {
    sectionToShow.classList.remove('hidden');
    sectionToHide.classList.add('hidden');
}

fichasSectionBtn.addEventListener('click', () => showSection(fichasSection, atendimentosSection));
atendimentosSectionBtn.addEventListener('click', () => showSection(atendimentosSection, fichasSection));
