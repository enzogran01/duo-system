exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.status(403).send('403 Forbidden: Bad CSRF Token');
    }
    next(err);
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};