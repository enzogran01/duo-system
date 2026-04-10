exports.index = (req, res) => {
    res.render('dashboard/dashboard', { pageTitle: " | Home", script: "dashboard.js" });
}