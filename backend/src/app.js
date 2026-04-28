const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../frontend/pages'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { MongoStore } = require('connect-mongo');
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use(session({
  secret: 'la-BskxAS_c9kc0-9cASF20u__cjoias',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
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
app.use(flash());

// rotas
const route = require('./routes/routes');
app.use(route);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));

module.exports = app;