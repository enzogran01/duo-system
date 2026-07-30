const Atendimento = require('../models/AtendimentoModel');
const Ficha = require('../models/FichaModel');

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

module.exports.getNew = async (req, res) => {
    try {
        const fichas = await Ficha.getAll();
        res.render('atendimento/new', {
            pageTitle: ' | Novo Atendimento',
            user: req.session.user,
            script: 'newAtendimento.js',
            fichas
        });
    } catch(e) {
        console.error(e);
        res.redirect('/error');
    }
}

module.exports.register = async (req, res) => {
    try {
        const atendimento = new Atendimento(req.body);
        await atendimento.register();

        if (atendimento.errors.length > 0) {
            req.session.errors = atendimento.errors;
            req.session.save(() => res.redirect("/dashboard"));
            return;
        }

        req.session.errors = [];
        req.session.save(() => res.redirect("/dashboard"));
        return;
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

module.exports.update = async (req, res) => {
    try {
        if (!req.params.id) return res.redirect('/error');
        const atendimento = new Atendimento(req.body);
        await atendimento.update(req.params.id);

        if (atendimento.errors.length > 0) {
            req.session.errors = atendimento.errors;
            req.session.save(() => res.redirect(`/atendimento/${req.params.id}`));
            return;
        }

        req.session.save(() => res.redirect(`/atendimento/${req.params.id}`));
        return;
    } catch (e) {
        console.log(e);
        res.redirect('/error');
    }
}