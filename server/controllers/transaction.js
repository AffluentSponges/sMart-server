// const { Transaction } = require('../models')
// const twilio = require('./twilio');
// const axios = require('axios');
// const uber = axios.create({
//   baseURL: 'https://sandbox-api.uber.com/sandbox/deliveries/',
//   timeout: 1000,
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// });
// const coinbaseController = require('./coinbase');

// // var controller = {};

// module.exports.deliverNotifications = function(delivery_id, status) {
//   Transaction.getTransactionInfo(delivery_id)
//   .then(transaction => {
//     transaction.set({status: status}).save();    	
//     });
// };

// module.exports.completeTransaction = function(delivery_id) {
//   Transaction.getTransactionInfo(delivery_id)
//   .then(function(transactionData) {
//     var transaction = transactionData.attributes;
//     var idem = transaction.id;
//     var seller = transactionData.relations.seller.attributes;
//     var sellerWalletAddress = seller.wallet_address;
//     var product = transactionData.relations.product.attributes;
//     var salePrice = Number(product.asking_price);

//     return coinbaseController.convertCurrency(salePrice)
//     .then(function(btc) {
//     coinbaseController.sendBTC(idem, sellerWalletAddress, btc);
//     })
//     .catch(err => {
//       console.log('error:', err)
//     })
//   })
// };