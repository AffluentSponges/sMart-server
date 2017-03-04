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
  const attempted_buyer_id = req.body.buyer_id
  
  var product

  Product.attemptPurchase(product_id, attempted_buyer_id)
  .then(p => {
    product = p;
    return User.findById(attempted_buyer_id)
  })
  .then(buyer => {
    return uberRUSH.quote(product, buyer)
  })
  .then(delivery => {
    var totalPrice = parseInt(product.attributes.asking_price) + delivery.uber_delivery_price
    return coinbase.convertCurrency(totalPrice)
  })
  .then(bitcoinAmount => {
    if(product.attributes.attempted_buyer_id !== attempted_buyer_id) {
      res.send({
        message: 'Someone already bought this item'
      })
    } else {
      res.send({message: 'waiting for coinbase payment',
                BTC: bitcoinAmount})
    }
    product.set({total_price_btc: bitcoinAmount}).save()
  })
};


controller.quote = function(req, res) {
  const product_id = req.query.product_id
  const buyer_id = req.query.buyer_id
  if (req.query.buyer_id === undefined) {
    var data = {
        dropoff_eta: 10,
        pickup_eta: 10,
        uber_delivery_price: '6'
      };
    res.send(data)
    return;
  }

  var product

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

var cnt = 0;
controller.isPaid = function(req, res) {
  Product.findById(req.query.id)
  .then(product => {
    var thisProduct = product.serialize();
    if (thisProduct.buyer_id === req.query.id && thisProduct.sold) {

    }
    console.log(thisProduct.buyer_id, thisProduct.sold);

    if (cnt < 5) {
      res.send('');  
    } else {
      res.json({paid: true});
    }
    cnt++;

  })
};

module.exports = controller
