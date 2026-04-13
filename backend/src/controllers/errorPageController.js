exports.index = (req, res) => {
    res.render('404/404', { pageTitle: " | Página não encontrada", script: "404.js", user: null });
}