const express = require('express');
const route = express.Router();
const { loginRequired } = require('../middlewares/middleware.js');
const loginController = require('../controllers/loginController');
const dashboardController = require('../controllers/dashboardController');
const errorPageController = require('../controllers/errorPageController');
const logoutController = require('../controllers/logoutController');

// rotas de login
route.get('/', loginController.index);
route.post('/', loginController.login);

// rotas de dashboard
route.get('/dashboard', loginRequired, dashboardController.index);
route.post('/dashboard', loginRequired, dashboardController.register);

// rotas de página 404
route.get('/error', errorPageController.index);

// rotas de logout
route.get('/logout', loginRequired, logoutController.index);

module.exports = route;