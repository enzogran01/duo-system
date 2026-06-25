const Ficha = require('../models/FichaModel');

exports.get = async (req, res) => {
    try {
        const ficha = await Ficha.findById(req.params.id);
        if (!ficha) return res.redirect('/error');
        
        res.render('ficha/ficha', { 
            ficha, 
            pageTitle: ` | Ficha de ${ficha.nome}`,
            script: "ficha.js",
            user: req.session.user,
        });
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

exports.register = async (req, res) => {
    try {
        const ficha = new Ficha(req.body);
        await ficha.register();

        if (ficha.errors.length > 0) {
            req.session.errors = ficha.errors;
            req.session.save(() => res.redirect("/dashboard"));
            return;
        }

        req.session.errors = [];
        return;
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.redirect('/error');

    const ficha = await Ficha.delete(req.params.id);
    if (!ficha) return res.render('/error');

    req.session.save(() => res.redirect('/dashboard'));
    return;
}

exports.update = async (req, res) => {
    try {
        if (!req.params.id) return res.redirect('/error');
        const ficha = new Ficha(req.body);
        await ficha.update(req.params.id);

        if (ficha.errors.length > 0) {
            req.session.errors = ficha.errors;
            req.session.save(() => res.redirect("/dashboard"));
            return;
        }

        req.session.save(() => res.redirect(`/ficha/${req.params.id}`));
        return;
    } catch (e) {
        console.log(e);
        res.redirect('/error');
    }
}