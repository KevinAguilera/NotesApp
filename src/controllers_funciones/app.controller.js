// guardo en un objeto
const appCtrl = {};

appCtrl.renderApp = function (req, res) {
  res.render('app')
};

appCtrl.renderAbout = function (req, res) {
  res.render('about')
};

// exporto para poder acceder de otro archivo
module.exports = appCtrl;
