const Product = require('../models/product')
const Transaction = require('../models/transaction')
const {User} = require('../models')
const uberRUSH = require('./uberRUSH')
const coinbase = require('./coinbase')

module.exports.getAll = function (req, res) {
  Product.findAll()
  .then(products => {
    res.json(products)
  })
}

module.exports.getOne = function (req, res) {
  Product.findById(req.query.id)
  .then(product => {
    res.json(product)
  })
}

module.exports.attemptPurchase = function(req, res) {
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
    var totalPrice = parseFloat(product.attributes.asking_price) + delivery.uber_delivery_price
    return coinbase.convertCurrency(totalPrice)
  })
  .then(bitcoinAmount => {
    if(product.attributes.attempted_buyer_id !== attempted_buyer_id) {
      res.send({
        message: 'Someone already bought this item',
        status: 'sold'
      })
    } else {
      res.send({message: 'waiting for coinbase payment',
                status: 'pending',
                BTC: bitcoinAmount})
    }
    product.set({total_price_btc: bitcoinAmount}).save()
  })
};


module.exports.quote = function(req, res) {
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

module.exports.post = function(req, res) {
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

module.exports.getUserProducts = function(req, res) {
  if (req.query.condition === undefined) {
    Product.getAllBySellerId(req.query.user_id)
    .then(products => {
      res.json(products)
    })
  } else if (req.query.condition === 'delivery') {
    Transaction.getItemsOnDelivery(req.query.user_id)
    .then(products => {
      console.log('client is asking delivery status');
      res.json(products)
    })
  } else if (req.query.condition === 'selling') {
    Product.getSellingBySellerId(req.query.user_id)
    .then(products => {
      res.json(products)
    })
  } else if (req.query.condition === 'sold') {
    res.end();
  } else if (req.query.condition === 'bought') {
    res.end();
  } 
};

// var cnt = 0;
module.exports.isPaid = function(req, res) {
  Product.findById(req.query.id)
  .then(product => {
    var thisProduct = product.serialize();
    if (thisProduct.buyer_id === parseInt(req.query.buyer_id)) {
      res.json({paid: true});
    } else {
      res.json({paid: false});     
    }
    // if (cnt < 5) {
    //   res.send('');  
    // } else {
    //   res.json({paid: true});
    // }
    // cnt++;
  })
};
