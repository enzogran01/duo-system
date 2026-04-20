const Atendimento = require('../models/AtendimentoModel');

exports.delete = async (req, res) => {
    try {
        Atendimento.delete();
    } catch(e) {
        console.log(e);
        res.redirect('/error');
    }
}