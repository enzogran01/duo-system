const express = require('express');
const app = express();
const session = require('express-session');
const route = require('./routes/routes');

app.use(express.json());
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
const userRoutes = require('./routes/userRoutes');
app.use('/', route);