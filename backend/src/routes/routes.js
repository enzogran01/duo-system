const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');

route.get('/', loginController.login);

module.exports = route;