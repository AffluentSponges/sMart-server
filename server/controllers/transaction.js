const { Transaction } = require('../models')
const twilio = require('./twilio');
const axios = require('axios');
// const uber = axios.create({
//   baseURL: 'https://sandbox-api.uber.com/sandbox/deliveries/',
//   timeout: 1000,
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// });
const coinbaseController = require('./coinbase');

// var controller = {};

module.exports.deliverNotifications = function(delivery_id, status) {
  Transaction.getTransactionInfo(delivery_id)
  .then(function(transactionData) {
    var product = transactionData.relations.product.attributes;
    var seller = transactionData.relations.seller.attributes;
    var buyer = transactionData.relations.buyer.attributes;
    var transaction = transactionData.attributes;

<<<<<<< HEAD
      	transactionData.set({status: status}).save();
            twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}.\nETA: ${pickupEta}`);
            twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}.\nETA: ${dropoffEta}`);          

=======
    transactionData.set({status: status}).save();
>>>>>>> ecacaa1bf9f19ffd550cfc1af348039ee739dd88

    // uber.get(`${delivery_id}`)
    // .then(function(res) {
    // 	var pickupEta = res.pickup.eta;
    // 	var pickupInstructions = res.pickup.special_instructions;
    // 	var dropoffEta = res.dropoff.eta;
    // 	var dropoffInstructions = res.dropoff.special_instructions;
    // 	// twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}.\nETA: ${pickupEta}`);
    // 	// twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}.\nETA: ${dropoffEta}`);      	

    // 	if (pickupInstructions) {
    // 		// twilio.sendSms(seller.phone_number, `S-Mart Uber-Rush delivery instructions:\n${pickupInstructions}`)
    // 	}
    // 	if (dropoffInstructions) {
    // 		// twilio.sendSms(buyer.phone_number, `S-Mart Uber-Rush delivery instructions:\n${dropoffInstructions}`)
    // 	}
    // })
  });
};

module.exports.completeTransaction = function(delivery_id) {
	Transaction.getTransactionInfo(delivery_id)
	.then(function(transactionData) {
      	var transaction = transactionData.attributes;
      	var idem = transaction.id;
      	var seller = transactionData.relations.seller.attributes;
      	var sellerWalletAddress = seller.wallet_address;
      	var product = transactionData.relations.product.attributes;
      	var salePrice = Number(product.asking_price);
		
            coinbaseController.convertCurrency(salePrice)
		.then(function(btc) {
			coinbaseController.sendBTC(idem, sellerWalletAddress, btc);
		})
	})
};