const db = require('../db/db')

var controller = {}

controller.getAll = function (req, res) {
  console.log('getAll products')
  db.Product.findAll()
  .then(products => {
    res.json(products)
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