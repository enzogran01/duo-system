const Atendimento = require("../models/AtendimentoModel");

exports.index = async (req, res) => {
    try {
        const atendimentos = await Atendimento.getAll();
        res.render('dashboard/dashboard', { 
            pageTitle: " | Home", 
            script: "dashboard.js",
            user: req.session.user,
            atendimentos
        });
    } catch (e) {
        console.log(e);
        res.redirect('/error');
    }
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