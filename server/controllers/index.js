var controllers = {}

controllers.userController = require('./user')
controllers.productController = require('./product')
controllers.categoryController = require('./category')
controllers.transactionController = require('./transaction')

module.exports = controllers