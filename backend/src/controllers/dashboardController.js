exports.index = async (req, res) => {
    try {
        const atendimentos = await Atendimento.getAll();
        res.render('dashboard/dashboard', { 
            pageTitle: " | Home", 
            script: "dashboard.js",
            user: req.session.user
        });
    } catch (e) {
        console.error(e);
        res.redirect('/error');
    }
};