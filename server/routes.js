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
// router.get('/auth/google/success', function(req, res) {
//   console.log('SUCCESS', req.session);
//   res.redirect('/');
//   // res.send(req.session);
// })

// router.get('/auth/google/failure', function(req, res) {
//   console.log('LOGIN FAILURE');
//   res.redirect('/login');
// });

router.get('/login', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
      successRedirect : '/',
      failureRedirect : '/auth/google/failure'
}));

//example req.body:
// {
//   "seller_id": 2,
//   "address": "asfsadg",
//   "address_2": "asdgasfh",
//   "postal_code": "1234124",
//   "buyer_id": 3,
//   "category_id": 2,
//   "title": "asgasdg",
//   "description": "sdfhsdjhgsdfh",
//   "asking_price": "100.11",
//   "imageUrl": ["asdgasfhfshashf"]
// }
router.get('/users/auth', function(req, res) {
  res.send(req.session);
})

router.post('/api/v1/postitem', productController.post);

//Needs seller_id to passed in through req
router.get('/api/v1/getuserproducts', productController.getUserProducts);

//needs id passed in through req
router.get('/api/v1/getuserprofile', userController.getUserProfile);

router.get('/api/v1/getone', productController.getOne);

router.post('/api/v1/postcontactinfo', userController.setContactInfo);

router.post('/api/v1/postitem', (req, res) => {
  productController.post(req, res)
})

//Needs seller_id to passed in through req
router.get('/api/v1/getuserproducts', (req, res) => {
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
router.get('/api/v1/product', productController.getOneProduct) //?id=3

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