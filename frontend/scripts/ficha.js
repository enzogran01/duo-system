// ===== ENABLE/DISABLE INPUT EDIT =====

const editFichaButton = document.getElementById("editFicha");
const submitEditButton = document.getElementById("submitEditButton");

const toggleDisabledElement = (el) => el.disabled = el.disabled ? false : true;

editFichaButton.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".edit-input");
    inputs.forEach(input => {
        toggleDisabledElement(input);
    });
    toggleDisabledElement(submitEditButton);
});

// ===== VALIDATE INPUTS =====
const numberInputs = document.querySelectorAll(".number-input");
numberInputs.forEach(input => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9.]/g, "");
    });
});
