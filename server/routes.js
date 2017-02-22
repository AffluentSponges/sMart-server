var router = require('express').Router()
const path = require('path');
var categoryController = require('./controllers/category')
var productController = require('./controllers/product')
var uberRUSHController = require('./controllers/uberRUSH')
var auth = require('./auth/helpers')


// Routes for signup, signin, and signout

// router.post('/signup', userController.signup.post);

// router.post('/signin', userController.signin.post);

// router.post('/signout', userController.signout.post);

// router.get('/session', userController.session.get);

// formData = {
//  title: "asdfasdf",
//  address: "922 Folsom Street, San Francisco, CA, United States",
//  imageUrl: "https://s3-us-west-1.amazonaws.com/affluentsponges/product_image/2116898781080181.jpg",
//  details: "sdajglkadsflkasdjflkasdjflasjldfjalsdfasdf",
//  category: "Fashion and Accessories"
// }


// {
// "title":"dsafasdf",
// "address1":"922 folsom",
// "address2":"#521"
// "zip":"723"
// "imageUrl":"https://s3-us-west-1.amazonaws.com/affluentsponges/product_image/899091525183126.jpg",
// "details":"fdasfasdgdasfdsfdsf",
// "category":"Home and Garden"
// }

router.post('/postitem', (req, res) => {
  console.log(req);
})

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

// router.get('*', (req, res, next) => {
//   if(req.path.split('/')[1] === 'static') return next();
//   res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
// });

module.exports = router