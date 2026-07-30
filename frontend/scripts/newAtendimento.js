// ===== ENABLE/DISABLE BUTTON BASED ON REQUIRED FIELDS
const fichaInput = document.getElementById('ficha');
const dataAtendimentoInput = document.getElementById('data_atendimento');
const servicoInput = document.getElementById('servico');
const queixaInput = document.getElementById('queixa');
const rotinaDiariaInput = document.getElementById('rotina_diaria');
const prescricaoInput = document.getElementById('prescricao');
const profissionalInput = document.getElementById('profissional');
const horarioInput = document.getElementById('horario');

const submitButton = document.getElementById('submitEditButton');

const verifyRequiredFields = () => {
    return fichaInput.value.trim().length > 0 && 
           dataAtendimentoInput.value.trim().length > 0 &&
           servicoInput.value.trim().length > 0 &&
           queixaInput.value.trim().length > 0 &&
           rotinaDiariaInput.value.trim().length > 0 &&
           prescricaoInput.value.trim().length > 0 &&
           profissionalInput.value.trim().length > 0 &&
           horarioInput.value.trim().length > 0;
};

const updateButtonState = () => {
    if (verifyRequiredFields()) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', true);
    }
};

const createInputs = document.querySelectorAll('.create-input');
createInputs.forEach(input => {
    input.addEventListener('input', updateButtonState);
    input.addEventListener('change', updateButtonState); // Needed for select and date
});

const resetInputsBtn = document.getElementById('resetInputsBtn');
if (resetInputsBtn) {
    resetInputsBtn.addEventListener('click', () => {
        createInputs.forEach(input => {
            input.value = '';
        });
        updateButtonState();
    });
}