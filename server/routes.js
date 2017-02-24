const router = require('express').Router()
const path = require('path');
const passport = require('passport');
var categoryController = require('./controllers/category')
var productController = require('./controllers/product')
var uberRUSHController = require('./controllers/uberRUSH')
var upload = require('./s3/upload')
var s3Handler = require('./s3/s3Handler')
var userController = require('./controllers/users')
// Routes for login and logout

router.get('/login', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback',
	passport.authenticate('google', {
    	successRedirect : '/',
    	failureRedirect : '/login'
	})
);


//TODO:
// given a user, return all products you have listed
// given user, return user profile info 
// post location phone number -- make sure optional


router.post('/api/v1/postitem', (req, res) => {
  productController.post(req, res)
})

//Needs seller_id to passed in through req
router.get('/api/v1/getuserproducts', (req, res) => {
  console.log(req.query)
  productController.getUserProducts(req, res)
});

//needs id passed in through req
router.get('/api/v1/getuserprofile', (req, res) => {
  userController.getUserProfile(req, res)
})

router.post('/api/v1/postcontactinfo', (req, res) => {
  userController.setContactInfo(req, res)
})

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/api/v1/categories', categoryController.getAll) 
router.get('/api/v1/products', productController.getAll) //?category_id=3 default sold=false
// router.get('/api/v1/product') //?id=3

// router.get('/api/v1/user') //?id=3
// router.post('/api/v1/user') {location, phone_number, etc}

// router.post('/api/v1/product') {location, item info, image_urls, etc}

// router.get('/api/v1/products')?user_id=3&sold=true
// router.get('/api/v1/products')?user_id=3&sold=false


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

router.post('/upload', upload, s3Handler)

router.get('*', (req, res, next) => {
  // if(req.path.split('/')[1] === 'static') return next();
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

module.exports = router