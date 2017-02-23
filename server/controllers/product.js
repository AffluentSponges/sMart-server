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
    var date = new Date()
    date = date.toUTCString()
    return db.Transaction.upsert({product_id: product.id},
      {
      user_id: product.attributes.buyer_id,
      sale_price: product.attributes.asking_price,
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

//seller_id & category_id need to be not hardcoded
//can delete preferred_time_and_date
controller.post = function(req, res) {
  db.Product.create(  {
  seller_id: 1,
  address: req.body.address,
  address_2: req.body.address_2,
  postal_code: req.body.zip,
  buyer_id: null,
  category_id: 1,
  title: req.body.title,
  description: req.body.details,
  asking_price: req.body.price,
  image_links: [req.body.imageUrl],
  })
  res.end('all good homies')
}

module.exports = controller
