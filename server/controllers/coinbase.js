require('dotenv').config()

var Client = require('coinbase').Client;
var client = new Client({'apiKey': process.env.COINBASE_KEY, 'apiSecret': process.env.COINBASE_SECRET});

//happens once when you start up the server
// client.getAccounts({}, function(err, accounts) {
//   console.log(accounts)
//   accounts.forEach(function(acct) {
//     console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
//   });
// });

controller = {}


function getAccountAysnc(wallet) {
  return new Promise(function(resolve,reject) {
    client.getAccount(wallet, function(err, account) {
      if(err !== null) return reject(err);
      resolve(account)
    })
  })
}

function createAddressAysnc(account) {
  return new Promise(function(resolve, reject) {
    account.createAddress(null, function(err, address) {
      if(err !== null) return reject(err);
      resolve(address)
    })
  })
}

controller.createAddress = function() {
  return getAccountAysnc(process.env.COINBASE_BTC_ACCOUNT)
  .then(account => {
    return createAddressAysnc(account)
  })
}

controller.webhook = function(req, res) {
  // console.log(req.body)
  console.log('coinbase ping')
}

module.exports = controller
