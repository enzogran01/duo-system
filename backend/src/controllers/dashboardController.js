const Atendimento = require("../models/AtendimentoModel");
const { login } = require("./loginController");

exports.index = (req, res) => {
    res.render('dashboard/dashboard', { 
        pageTitle: " | Home", 
        script: "dashboard.js",
        user: req.session.user
    });
};

exports.register = async (req, res) => {{
    try {
        const atendimento = new Atendimento(req.body);
        await atendimento.register();

        if (atendimento.errors.length > 0) {
            req.session.atendimentoErrors = atendimento.errors;
            req.session.save(() => res.redirect("/"));
            return;
        }

        req.session.atendimentoErrors = [];
        req.session.save(() => res.redirect("/dashboard"));
    } catch (e) {
        console.log(e);
        return res.redirect('/error');
    }
}}