const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var sendSms = function(to, message) {
  client.messages.create({
    body: message,
    to: to,
    from: process.env.TWILIO_NUMBER
    // mediaUrl: 'http://www.yourserver.com/someimage.png'
  }, function(err, data) {
    if (err) {
      console.error(err);
    }
  });
};

module.exports.sendSms = sendSms

module.exports.updateSeller = function(transaction) {
  var t = transaction.serialize()
  sendSms(
    t.seller.phone_number, 
    `S-Mart Alert for ${t.seller.username}: Your recently sold product, ${t.product.title}, is ${t.status.split('_').join(' ')}.\nETA:`
  )
}

module.exports.updateBuyer = function(transaction) {
  var t = transaction.serialize()
  sendSms(
    t.buyer.phone_number, 
    `S-Mart Alert for ${t.buyer.username}: Your recently purchased product, ${t.product.title}, is ${t.status.split('_').join(' ')}.\nETA:`
  )
}
