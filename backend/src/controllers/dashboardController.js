const Ficha = require('../models/FichaModel');

exports.index = async (req, res) => {
    try {
        const fichas = await Ficha.getAll();

        res.render('dashboard/dashboard', { 
            pageTitle: " | Home", 
            script: "dashboard.js",
            user: req.session.user,
            fichas
        });
    } catch (e) {
        console.error(e);
        res.redirect('/error');
    }
};