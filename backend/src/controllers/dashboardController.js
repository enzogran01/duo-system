const Ficha = require('../models/FichaModel');
const Atendimento = require('../models/AtendimentoModel');

exports.index = async (req, res) => {
    try {
        const fichas = await Ficha.getAll();
        const atendimentos = await Atendimento.getAll();

        res.render('dashboard/dashboard', { 
            pageTitle: " | Home", 
            script: "dashboard.js",
            user: req.session.user,
            fichas,
            atendimentos
        });
    } catch (e) {
        console.error(e);
        res.redirect('/error');
    }
};