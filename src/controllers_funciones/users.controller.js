const usersCtrl = {};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models_esquemasmongo/User');

// Mostrar formulario de registracion
usersCtrl.renderSignUpForm = function (req, res) {
  res.render('users/signup');
};

 // Registrar usuario, validar y mostrar mensaje de errores con push que inserta algo dentro del arreglo
usersCtrl.signup = async function(req, res) {
  const errors = [];

  const { name, email, password, confirm_password} = req.body;
  if (password != confirm_password) {
    errors.push({text: 'Passwords do not match!'});
  }
  // por cuantos ccaracteres se conforma la contraseña
  if (password.length < 4) {
    errors.push({text: 'Passwords must  be at least 4 characters'});
  }
  // si hay al menos 1 error, enviarlo al formulario con los errores
  // cuando haya errores tambien se envian los datos que ingreso previamente asi no vuelve a tipear otra vez
  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
    })
  } else {
    // verificar si el correo existe en la base de datos, si lo hay que salga error
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      req.flash('error_msg', 'Email Already In Use');
      res.redirect('/users/signup');
  } else {
    // si es valido save para que se guarde en la base de datos y encripto contraseña con el metodo en ../models_esquemasmongo/User
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encriptarcontraseña(password)
    await newUser.save();
    req.flash('success_msg', 'You are now registered');
    res.redirect('/users/login');
  }
  }
};

// Mostrar Login
usersCtrl.renderLoginForm = function (req, res) {
  res.render('users/login');
};

// si el usuario se equivoca se redirecciona al formulario de login, y si todo va bien va al formulario de notas, si hay un error uso connect-flash para que lo vea(ver errors.handlebars)
usersCtrl.login = passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/notes',
  failureFlash: true
});

// Autenticar usernames y passwords, una vez los tenga los valido ( el call back lo llamo done )
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async(email, password, done) => {


  // Match Email. Si el usuario no existe se retorna un error con done ( false porque no existe usuario)
  const user = await User.findOne({email});
  if (!user) {
    return done(null, false, { message:'Not User Found'});
  } else {
    // si el usuario existe, Match Password con el metodo que esta es ../models_esquemasmongo/User
  const match = await user.matchearcontraseña(password);
  if (match) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect Password'});
  }
  }
}));

// Cuando el usuaria es registrado se guarda en la sesion del servidor(serialize), luego passport consulta la base de datos para ver si tiene autorizacion y obtiene los resultados del usuario(deserialize)
passport.serializeUser((user,done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Cerrar Sesion con passport y mensaje con connect-flash
usersCtrl.logout = function (req, res) {
  req.logout();
  req.flash('success_msg', 'You are now logged out');
  res.redirect('/users/login');
}

module.exports = usersCtrl;
