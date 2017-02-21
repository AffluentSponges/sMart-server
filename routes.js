var router = require('express').Router()
var categoryController = require('./controllers/category')
var productController = require('./controllers/product')
var uberRUSHController = require('./controllers/uberRUSH')
var auth = require('./auth/helpers')

/** SIGN UP, SIGN IN, SIGN OUT **/

// Routes for signup, signin, and signout

/** FOR DANIEL TO FILL IN **/
// router.post('/api/v1/signup', userController.signup.post);

// router.post('/api/v1/signin', userController.signin.post);

// router.post('/api/v1/signout', userController.signout.post);

// router.get('/api/v1/session', userController.session.get);


router.get('/api/v1/categories', categoryController.getAll)
// router.get('/api/v1/test', categoryController.test)

router.get('/api/v1/products', productController.getAll)
// router.get('/api/v1/test', productController.test)

router.get('/api/v1/buy', uberRUSHController.getQuote)

router.post('/uber_webhook', uberRUSHController.webhook)
module.exports = router