const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');
const dashboardController = require('../controllers/dashboardController.js');

// rotas de login
route.get('/', loginController.home);
route.post('/', loginController.login);

// rotas de dashboard
route.get('/dashboard', dashboardController.home);

module.exports = route;