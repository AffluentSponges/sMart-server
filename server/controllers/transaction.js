const { Transaction } = require('../models')
const twilio = require('./twilio');

module.exports.deliverNotifications = function(delivery_id, status) {
	Transaction.getTransactionInfo(delivery_id)
    .then(function(transactionData) {
      var product = transactionData.relations.product.attributes;
      var seller = transactionData.relations.seller.attributes;
      var buyer = transactionData.relations.buyer.attributes;
      var transaction = transactionData.attributes;

      // twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}`);
      // twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}`);
    });
};