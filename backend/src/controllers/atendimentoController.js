const Atendimento = require('../models/AtendimentoModel');

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Atendimento.deleteById(id);
        res.redirect('/dashboard');
    } catch(e) {
        console.log(e);
        res.redirect('/error');
    }
}