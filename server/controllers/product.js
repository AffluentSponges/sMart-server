const db = require('../db/db')
var uberRUSHController = require('./uberRUSH')
var controller = {}

controller.getAll = function (req, res) {
  console.log('getAll products')
  db.Product.findAll()
  .then(products => {
    res.json(products)
  })
}


controller.buy = function(req, res, next) {
  console.log('buy Product')

  var product_id = req.body.product_id
  var buyer_id = req.body.buyer_id

  console.log('product_id: ', product_id)

  db.Product.findById(product_id)
  .then(product => {
    return product.set({buyer_id: buyer_id, sold: true}).save()
  })
  .then(product => {
    console.log('product: ', product)
    return db.Bid.upsert({
      user_id: product.attributes.buyer_id,
      product_id: product.id,
      offer_price: product.attributes.asking_price
    })
  })
  .then(bid => {
    var date = new Date()
    date = date.toUTCString()
    return db.Transaction.upsert({bid_id: bid.id},
      {
      sale_price: bid.attributes.offer_price,
      status: 'processing_buyer_payment',
      sale_time_and_date: date
    })
  })
  .then(transaction => {
    next()
  })
  .catch(err => {
    console.log('PRODUCT CONTROLLER BUY ERROR')
    console.log(err)
  })
}

// controller.test = function(req, res) {
//   console.log('in test request')
//   var name = req.query.name
//   db.Category.where(options).fetch({withRelated: ['products']})
//   .then( category => {
//     res.json(category)
//   })
// }

module.exports = controller