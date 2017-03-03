require('dotenv').config()
const uberRUSHController = require('./uberRUSH')
const {User,
       Product,
       Category,
       Transaction} = require('../models')

var Client = require('coinbase').Client;
var client = new Client({'apiKey': process.env.COINBASE_KEY, 'apiSecret': process.env.COINBASE_SECRET});

//happens once when you start up the server
// client.getAccounts({}, function(err, accounts) {
  // console.log(accounts)
  // accounts.forEach(function(acct) {
  //   console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
  // });
// });

// client.getNotification('d9cc3ee5-567e-5f8d-a031-11194e103d99', function(err, notification) {
//   console.log(notification);
// });

// getAccountAysnc(process.env.COINBASE_BTC_ACCOUNT)
// .then(account => {
//   account.getTransaction('13f07688-c6dc-539d-aacc-5c08288b1481', function(err, tx) {
//     console.log(tx)
//   })
// })

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

controller.prunePayload = function(data) {
  return {
    coinbase_address_id: data.data.id,
    amount: data.additional_data.amount.amount,
    currency: data.additional_data.amount.currency,
    coinbase_transaction_id: data.additional_data.transaction.id
  }
}

controller.acceptPayment = function(data) {
  var bitcoin_address = data.data.address
  var info = this.prunePayload(data)
  return Product.completePurchase(bitcoin_address)
  .then(product => {
    return Transaction.addNewTransaction(product, info)
  })
  .then(transaction => {
    return uberRUSHController.requestDelivery(transaction.attributes.product_id)
  })
}

controller.webhook = function(req, res) {
  if(req.body.type === 'wallet:addresses:new-payment') {
    controller.acceptPayment(req.body)
    .then(transaction => {
      res.json(transaction)
    })
  }
}

module.exports = controller