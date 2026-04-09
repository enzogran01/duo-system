exports.home = (req, res) => {
    res.render('login/login', { pageTitle: " | Login", script: "login.js" });
}

exports.login = (req, res) => {
    // verifica se tem no banco (models)
    // se tiver, redireciona pra /dashboard (.get)
    // se não tiver, volta pra login/login (middleware de login usado no routes)
}