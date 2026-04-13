const Login = require('../models/LoginModel');

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
            req.session.loginErrors = login.errors;
            req.session.save(() => res.redirect("/"));
            return;
        }

        req.session.loginErrors = [];
        req.session.user = login.user;
        req.session.save(() => res.redirect("/dashboard"));
    } catch (e) {
        console.log(e);
        return res.redirect('/404');
    }
}

exports.index = (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    
    const errors = req.session.loginErrors || [];
    req.session.loginErrors = [];
    res.render('login/login', { pageTitle: " | Login", script: "login.js", errors, user: null });
}