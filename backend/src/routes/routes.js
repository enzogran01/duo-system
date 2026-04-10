const express = require('express');
const route = express.Router();
const { loginRequired } = require('../middlewares/middleware.js');
const loginController = require('../controllers/loginController');
const dashboardController = require('../controllers/dashboardController');
const errorPageController = require('../controllers/errorPageController');

// rotas de login
route.get('/', loginController.index);
route.post('/', loginController.login);

// rotas de dashboard
route.get('/dashboard', loginRequired, dashboardController.index);

// rotas de página 404
route.get('/404', errorPageController.index);

module.exports = route;