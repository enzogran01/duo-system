exports.index = async (req, res) => {
    try {
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