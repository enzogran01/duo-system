exports.index = (req, res) => {
    res.render('errorPage/errorPage', { pageTitle: " | Página não encontrada", script: "errorPage.js", user: null });
}