const router = require('express').Router()
const path = require('path');
const passport = require('passport');
var categoryController = require('./controllers/category')
var productController = require('./controllers/product')
var uberRUSHController = require('./controllers/uberRUSH');


// Routes for login and logout

router.get('/login', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback',
	passport.authenticate('google', {
    	successRedirect : '/',
    	failureRedirect : '/login'
	})
);

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/api/v1/categories', categoryController.getAll)
// router.get('/api/v1/test', categoryController.test)

router.get('/api/v1/products', productController.getAll)
// router.get('/api/v1/test', productController.test)

router.get('/api/v1/buy', uberRUSHController.getQuote)

router.post('/uber_webhook', uberRUSHController.webhook)

router.get('/', (req, res, next) => {
  if(req.path.split('/')[1] === 'static') return next();
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

module.exports = router