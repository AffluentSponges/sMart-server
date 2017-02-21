const db = require('../db/db')

var controller = {}

controller.getAll = function (req, res) {
  db.Category.findAll()
  .then(categories => {
    res.json(categories)
  })
}

module.exports = controller