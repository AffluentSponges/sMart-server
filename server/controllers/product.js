const Product = require('../models/product')
const {User} = require('../models')
const uberRUSH = require('./uberRUSH')
var controller = {}

controller.getAll = function (req, res) {
  Product.findAll()
  .then(products => {
    res.json(products)
  })
}

controller.getOne = function (req, res) {
  Product.where({id: req.query.id}).fetchAll()
  .then(product => {
    res.json(product)
  })
}

controller.buy = function(req, res, next) {
  console.log('buy Product')

  const product_id = req.body.product_id
  const buyer_id = req.body.buyer_id

  console.log('product_id: ', product_id)

  Product.buyProduct(product_id, buyer_id)
    .then(transaction => {
      console.log('TRANSACTION: ', transaction)
      next()
    })
    .catch(err => {
      console.log('PRODUCT CONTROLLER BUY ERROR')
      console.log(err)
    })
  .then(transaction => {
    console.log('TRANSACTION: ', transaction)
    next()
  })
  .catch(err => {
    console.log('PRODUCT CONTROLLER BUY ERROR')
    console.log(err)
  })
}

controller.quote = function(req, res, next) {
  console.log('quote product')
  const product_id = req.query.product_id
  const buyer_id = req.query.buyer_id

  var product = null

  Product.getWithSeller(product_id)
  .then(p => {
    console.log('got product')
    product = p
    return User.findById(buyer_id) 
  })
  .then(buyer => {
    return uberRUSH.quote(product, buyer)
  })
  .then(delivery => {
    res.send(delivery)
  })
}


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
controller.post = function(req, res) {
  Product.create({
    seller_id: req.body.seller_id,
    address: req.body.address,
    address_2: req.body.address_2,
    postal_code: req.body.postal_code,
    category_id: req.body.category_id,
    title: req.body.title,
    description: req.body.description,
    asking_price: req.body.asking_price,
    image_links: req.body.imageUrl,  //make sure is array
  }).then(result => {
    res.send({id: result.attributes.id})
  }).catch(err => {
    console.log(err)
    res.end(JSON.stringify(err))
  })
}

controller.getOneProduct = function(req, res) {
  Product.findById(req.query.id)
  .then(products => {
    res.json(products)
  })
};


controller.getUserProducts = function(req, res) {
  Product.where({seller_id: req.query.user_id}).fetchAll()
  .then(products => {
    res.json(products)
  })
};

module.exports = controller
