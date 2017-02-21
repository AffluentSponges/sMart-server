var router = require('express').Router()
var categoryController = require('./controllers/category')
var auth = require('./auth/helpers')

/** SIGN UP, SIGN IN, SIGN OUT **/

// Routes for signup, signin, and signout

/** FOR DANIEL TO FILL IN **/
// router.post('/api/v1/signup', userController.signup.post);

// router.post('/api/v1/signin', userController.signin.post);

// router.post('/api/v1/signout', userController.signout.post);

// router.get('/api/v1/session', userController.session.get);


router.get('/api/v1/categories', categoryController.getAll)

// router.get('api/v1/products', productController.getAll)

module.exports = router