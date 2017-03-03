const Product = require('../models/product')
const {User} = require('../models')
const uberRUSH = require('./uberRUSH')
const coinbase = require('./coinbase')
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

controller.attemptPurchase = function(req, res) {
  const product_id = req.body.product_id
  const attempted_buyer_id = req.body.buyer_ids
  var product;

  Product.attemptPurchase(product_id, attempted_buyer_id)
  .then(p => {
    product = p;
    return coinbase.convertCurrency(p.attributes.asking_price)
  }).then( bitcoinAmount => {
      if(product.attributes.attempted_buyer_id !== attempted_buyer_id) {
        res.send({
          message: 'Someone already bought this item'
        })
      } else {
        res.send({message: 'waiting for coinbase payment',
                  BTC: bitcoinAmount})
      }
  })
};


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
  var product;
  Product.create(req.body)
  .then( p => {
    product = p
    return coinbase.createAddress()
  })
  .then(address => {
    var options = {
      bitcoin_address: address.address,
    }
    return product.set(options).save()
  })
  .then(p => {
    res.send({id: p.attributes.id})
  })
}

controller.getUserProducts = function(req, res) {
  Product.getAllBySellerId(req.query.seller_id)
  .then(products => {
    res.json(products)
  })
};

module.exports = controller
