const { Router } = require('express');
const router = Router();

const { renderSignUpForm, renderLoginForm, signup, login, logout } = require('../controllers_funciones/users.controller')

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('/users/login', renderLoginForm);

router.post('/users/login', login);

router.get('/users/logout', logout);

module.exports = router;
