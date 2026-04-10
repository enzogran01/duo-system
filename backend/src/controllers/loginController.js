const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login/login', { pageTitle: " | Login", script: "login.js" });
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect("/"));
            return;
        }

        req.session.user = login.user;
        req.session.save(() => res.redirect("/dashboard"));
    } catch (e) {
        console.log(e);
        return res.redirect('/404');
    }
}