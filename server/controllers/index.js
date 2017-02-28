var controllers = {}

controllers.userController = require('./user')
controllers.productController = require('./product')
controllers.categoryController = require('./category')
controllers.transactionController = require('./transaction')
controllers.uberRUSHController = require('./uberRUSH')

module.exports = controllers