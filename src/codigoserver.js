const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Inicializaciones
const app = express();
require('./controllers_funciones/users.controller');

// Settings(lo que quiero que haga express)
app.set('views', path.join(__dirname, 'views'));
app.engine('.handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.handlebars'
})),
app.set('view engine', '.handlebars');

// Middlewares (funciones que se ejecutan a medida que vienen peticiones del usuario)
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_borrar'));
app.use(methodOverride('_method'));

// Middlewares para mensajes de "nota creada o borrada con exito"
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables Globales ( uso next para que se ejecuten los codigos que le siguen debajo)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
// Guardo el usuario en variable global para reutilizarlo con passport(null por si no existe)
res.locals.user = req.user || null;
  next();
});

// Routes
app.use(require('./routes/app.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public_archivosestaticos')));


module.exports = app;
