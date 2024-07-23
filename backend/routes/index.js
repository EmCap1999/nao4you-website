const firebaseAuthController = require('../controllers/firebase-auth-controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
  });

  app.post('/api/register', firebaseAuthController.registerUser);
  app.post('/api/login', firebaseAuthController.loginUser);
  app.post('/api/logout', firebaseAuthController.logoutUser);
  app.post('/api/reset-password', firebaseAuthController.resetPassword);
};
