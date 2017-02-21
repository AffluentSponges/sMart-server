const db = require('../db/db')

var controller = {}

controller.getAll = function (req, res) {
  console.log('getAll products')
  db.Product.findAll()
  .then(products => {
    res.json(products)
  })
}

module.exports = controller