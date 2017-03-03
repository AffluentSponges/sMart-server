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

function sendBTCAsync (account, sellerAddress, amount) {
  return new Promise(function(resolve, reject) { 
    client.getAccount(process.env.COINBASE_BTC_ACCOUNT, function(err, account) {
      account.sendMoney({'to': sellerAddress,
                        'amount': amount,
                        'currency': 'BTC'}, 
        function(err, tx) {
          if(err) {
            console.log(err) 
          } else {
            console.log('sent ฿!');
          }
          resolve(tx)
        });
    });
  });
}
controller.sendBTC = function(sellerAddress, amount) {
  return getAccountAysnc(process.env.COINBASE_BTC_ACCOUNT)
  .then(account => {
    return sendBTCAsync(account, sellerAddress, amount)
  })
}

controller.webhook = function(req, res) {
  console.log('coinbase ping')
}

module.exports = controller
