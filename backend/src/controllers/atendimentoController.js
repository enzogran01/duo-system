const Atendimento = require('../models/AtendimentoModel');

module.exports.get = async (req, res) => {
    try {
        const atendimento = await Atendimento.findById(req.params.id);
        if (!atendimento || !atendimento.ficha) return res.redirect('/error');

        res.render('atendimento/atendimento', {
            atendimento,
            ficha: atendimento.ficha,
            pageTitle: ` | Atendimento de ${atendimento.ficha.nome}`,
            script: "atendimento.js",
            user: req.session.user,
        });
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

module.exports.delete = async (req, res) => {
    if (!req.params.id) return res.redirect('/error');

    const atendimento = await Atendimento.delete(req.params.id);
    if (!atendimento) return res.render('/error');

    req.session.save(() => res.redirect('/dashboard'));
    return;
}