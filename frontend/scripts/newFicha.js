// ===== ENABLE/DISABLE BUTTON BASED ON REQUIRED FIELDS (nome e telefone)
const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const submitButton = document.getElementById('submitEditButton');

const verifyRequiredFields = () => {
    return nomeInput.value.trim().length > 0 && telefoneInput.value.trim().length > 0;
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
});

resetInputsBtn.addEventListener('click', () => {
    createInputs.forEach(input => {
        input.value = '';
    });
    updateButtonState();
});