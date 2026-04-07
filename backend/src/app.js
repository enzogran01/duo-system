const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../frontend/pages'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use(session({
  secret: 'la-BskxAS_c9kc0-9cASF20u__cjoias',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    name: "duo-cookie",
    sameSite: 'lax'
  }
}));

// rotas
const route = require('./routes/routes');
app.use(route);

module.exports = app;