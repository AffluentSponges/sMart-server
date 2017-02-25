const db = require('../db/db')

var controller = {}

controller.getAll = function (req, res) {
  db.Category.findAll()
  .then(categories => {
    res.json(categories)
  })
}

// controller.test = function(req, res) {
//   console.log('in test request')
//   var name = req.query.name
//   db.Category.where({name: name}).fetch({withRelated: ['products']})
//   .then( category => {
//     res.json(category)
//   })
// }

module.exports = controller