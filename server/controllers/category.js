const Category = require('../models/category')

module.exports.getAll = function (req, res) {
  Category.findAll()
  .then(categories => {
    res.json(categories)
  })
}