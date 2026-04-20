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