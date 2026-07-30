const express = require('express');
const route = express.Router();
const { loginRequired } = require('../middlewares/middleware.js');
const loginController = require('../controllers/loginController');
const dashboardController = require('../controllers/dashboardController');
const errorPageController = require('../controllers/errorPageController');
const logoutController = require('../controllers/logoutController');
const fichaController = require('../controllers/fichaController');
const atendimentoController = require('../controllers/atendimentoController');

// rotas de login
route.get('/', loginController.index);
route.post('/', loginController.login);

// rotas de dashboard
route.get('/dashboard', loginRequired, dashboardController.index);

// rotas de página 404
route.get('/error', errorPageController.index);

// rotas de logout
route.get('/logout', loginRequired, logoutController.index);

// rotas de ficha
route.get('/ficha/new', loginRequired, fichaController.getNew);
route.get('/ficha/:id', loginRequired, fichaController.get);
route.get('/ficha/delete/:id', loginRequired, fichaController.delete);
route.get('/ficha/download/:id', loginRequired, fichaController.downloadPDF);
route.post('/ficha/new', loginRequired, fichaController.register);
route.post('/ficha/edit/:id', loginRequired, fichaController.update);

// rotas de atendimento
route.get('/atendimento/new', loginRequired, atendimentoController.getNew);
route.get('/atendimento/:id', loginRequired, atendimentoController.get);
route.get('/atendimento/download/:id', loginRequired, atendimentoController.downloadPDF);
route.post('/atendimento/edit/:id', loginRequired, atendimentoController.update);
route.get('/atendimento/delete/:id', loginRequired, atendimentoController.delete);
route.post('/atendimento/new', loginRequired, atendimentoController.register);

module.exports = route;