require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.sendSms = function(to, message) {
  client.messages.create({
    body: message,
    to: to,
    from: process.env.TWILIO_NUMBER
    // mediaUrl: 'http://www.yourserver.com/someimage.png'
  }, function(err, data) {
    if (err) {
      console.error('Message not sent to: ' + to + '\nMessage: ' + message);
      console.error(err);
    } else {
      console.error('Message was sent to: ' + to + '\nMessage: ' + message);
    }
  });
};