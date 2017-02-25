const db = require('../db/db')
const transaction = require('./transaction')
var model = {}

//returns the new transaction
model.buyProduct = function (product_id, buyer_id) {
  return db.Product.findById(product_id)
  .then(product => {
    return product.set({buyer_id: buyer_id, sold: true}).save()
  })
  .then(product => {
    return transaction.addNewTransaction(product)
  })
}

model.getWithSeller = function(id) {
  return db.Product.where({id: id}).fetch({withRelated: ['seller']})
}

model.getWithAllRelated = function(id) {
  return db.Product.where({id: id}).fetch({withRelated: ['seller', 'buyer', 'transaction']})
}


module.exports = model