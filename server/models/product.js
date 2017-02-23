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

module.exports = model