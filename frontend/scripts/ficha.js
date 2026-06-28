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
