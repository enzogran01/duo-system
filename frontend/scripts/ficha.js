// ===== TOOLTIPS =====
const deleteFicha = document.getElementById('deleteFicha');
const editFicha = document.getElementById('editFicha');
const downloadFicha = document.getElementById('downloadFicha');
const atendimentosFicha = document.getElementById('atendimentosFicha');

tippy(deleteFicha, {
    content: 'Apagar ficha',
    followCursor: true
});

tippy(editFicha, {
    content: 'Editar ficha',
    followCursor: true
});

tippy(downloadFicha, {
    content: 'Baixar PDF da ficha',
    followCursor: true
});

tippy(atendimentosFicha, {
    content: 'Atendimentos da ficha',
    followCursor: true
});
