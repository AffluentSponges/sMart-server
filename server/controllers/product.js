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
  Product.findById(req.query.id)
  .then(product => {
    res.json(product)
  })
}

// controller.attempt_purchase = function(req, res) {
//   const product_id = req.body.product_id
//   const attempted_buyer_id = req.body.buyer_id

//   Product.attemptPurchase(product_id, attempted_buyer_id)
//   .then(product => {
//     if(product.attributes.attempted_buyer_id !== attempted_buyer_id) {
//       res.send({message: 'Someone already bought this item'})
//     }
//     else {}
//   })
// }

controller.buy = function(req, res, next) {

  const product_id = req.body.product_id
  const buyer_id = req.body.buyer_id

  Product.buyProduct(product_id, buyer_id)
  .then(transaction => {
    //@TODO if this gets passed an error, don't do the next()!!!
    next()
  })
  .catch(err => {
    console.log('PRODUCT CONTROLLER BUY ERROR')
    console.log(err)
  })
}

controller.quote = function(req, res, next) {
  const product_id = req.query.product_id
  const buyer_id = req.query.buyer_id

  var product = null

  Product.getWithSeller(product_id)
  .then(p => {
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

controller.post = function(req, res) {
  Product.create(req.body)
  .then(result => {
    res.send({id: result.attributes.id})
  }).catch(err => {
    console.log(err)
    res.end(JSON.stringify(err))
  })
}

controller.getUserProducts = function(req, res) {
  Product.getAllBySellerId(req.query.seller_id)
  .then(products => {
    res.json(products)
  })
};

module.exports = controller
