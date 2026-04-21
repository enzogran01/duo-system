// ========== BUTTON TOOLTIPS ==========
const viewBtns = document.querySelectorAll(".view-btn");
const editBtns = document.querySelectorAll(".edit-btn");
const deleteBtns = document.querySelectorAll(".delete-btn");

viewBtns.forEach(btn => {
    tippy(btn, { content: 'Visualizar' });
});
editBtns.forEach(btn => {
    tippy(btn, { content: 'Editar' });
});
deleteBtns.forEach(btn => {
    tippy(btn, { content: 'Deletar' });
});

// ========== PHONE NUMBER FORMATTING ==========
const phones = document.querySelectorAll('.tel');
phones.forEach(phone => {
    const digits = phone.textContent.replace(/\D/g, '');
    if (digits.length === 11) {
        phone.textContent = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
    } else if (digits.length === 10) {
        phone.textContent = `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    }
});
