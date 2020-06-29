// middleware para proteger rutas validando(isauthenticated es de passport). Si el usuario está autenticado, que siga navegando, sino redireccionar al login
const autenticar = {};

autenticar.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized');
  res.redirect('/users/login');
}

module.exports = autenticar;
