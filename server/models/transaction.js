const db = require('../db/db')
var model = {}


model.addNewTransaction = function(product) {
  var date = new Date()
  date = date.toUTCString()
 return db.Transaction.upsert({product_id: product.id},
    {
    user_id: product.attributes.buyer_id,
    sale_price: product.attributes.asking_price,
    status: 'processing_buyer_payment',
    sale_time_and_date: date
  })
}


module.exports = model