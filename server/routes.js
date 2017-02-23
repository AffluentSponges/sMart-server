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


router.get('/api/v1/categories', categoryController.getAll) 
router.get('/api/v1/products', productController.getAll) //?category_id=3 default sold=false
// router.get('/api/v1/product') //?id=3

// router.get('/api/v1/user') //?id=3
// router.post('/api/v1/user') {location, phone_number, etc}

// router.post('/api/v1/product') {location, item info, image_urls, etc}

// router.get('/api/v1/products')?user_id=3&sold=true or sold=false
// router.get('/api/v1/products')?user_id=3&sold=true or sold=false


// router.get('/api/v1/product/get_quote', /*productController.getPickupAndDeliverInfo,*/ uberRUSHController.getQuote)
// ?product_id=3& buyer_id=4 

router.post('/api/v1/buy', productController.buy, uberRUSHController.requestDelivery)
// ?product_id=3 & buyer_id=4




/* ## NOT IN MVP ## */
// router.post('/api/v1/make_bid', /**/)
//?product_id=3 & user_id=4 & offer_price = 100.50

//delete an item
/* ################## */



router.post('/uber_webhook', uberRUSHController.webhook)

router.get('*', (req, res, next) => {
  if(req.path.split('/')[1] === 'static') return next();
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});


module.exports = router