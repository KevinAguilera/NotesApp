
const { Router } = require('express')
const router = Router();

// importar funciones
const { renderApp, renderAbout } = require('../controllers_funciones/app.controller');

router.get('/', renderApp);


// URLS
module.exports = router;
