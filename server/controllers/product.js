const db = require('../db/db')

var controller = {}

controller.getAll = function (req, res) {
  console.log('getAll products')
  db.Product.findAll()
  .then(products => {
    res.json(products)
  })
}


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
  preferred_time_and_date: 'February 22 12:30:00 2017 PST',
  image_links: [req.body.imageUrl],
  })
  res.end('all good homies')
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