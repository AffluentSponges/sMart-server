require('dotenv').config()

var Client = require('coinbase').Client;
var client = new Client({'apiKey': process.env.COINBASE_KEY, 'apiSecret': process.env.COINBASE_SECRET});

//happens once when you start up the server
client.getAccounts({}, function(err, accounts) {
  // console.log(accounts)
  accounts.forEach(function(acct) {
    console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
  });
});

controller = {}

controller.webhook = function(req, res) {
  console.log(req.body)
  console.log('coinbase ping')
}

module.exports = controller