const Ficha = require('../models/FichaModel');

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

}

exports.update = async (req, res) => {

}