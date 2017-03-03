var controllers = {}

controllers.userController = require('./user')
controllers.productController = require('./product')
controllers.categoryController = require('./category')
controllers.transactionController = require('./transaction')
controllers.uberRUSHController = require('./uberRUSH')
controllers.coinbaseController = require('./coinbase')
module.exports = controllers