const {Product, Transaction, User} = require('../models')

const transactionController = require('./transaction')
const UberRUSH = require('uber-rush')
const UberRUSHClient = UberRUSH.createClient({
    client_secret: process.env.UBER_RUSH_SECRET,
    client_id: process.env.UBER_RUSH_ID,
    sandbox: true // No couriers will actually be called if set
})


const twilio = require('./twilio');

var controller = {}

controller.createDeliveryObj = function(productWithRelatedData, potentialBuyer) {
  p = JSON.parse(JSON.stringify(productWithRelatedData))
  p.buyer = !!potentialBuyer ? JSON.parse(JSON.stringify(potentialBuyer)) : p.buyer

  const deliveryObj = {
    order_reference_id: p.id.toString(),
    item: {
      title: p.title,
      quantity: p.quantity,
      is_fragile: false
    },
    pickup: {
      contact: {
        first_name: p.seller.first_name,
        last_name: p.seller.last_name,
        phone: {
          number: p.seller.phone_number
        }
      },
      location: {
        address: p.seller.address,
        address_2: p.seller.address_2,
        city: p.seller.city,
        state: p.seller.state,
        postal_code: p.seller.postal_code,
        country: p.seller.country
      }
    },
    dropoff: {
      contact: {
        first_name: p.buyer.first_name,
        last_name: p.buyer.last_name,
        phone: {
          number: p.buyer.phone_number
        }
      },
      location: {
        address: p.buyer.address,
        address_2: p.buyer.address_2,
        city: p.buyer.city,
        state: p.buyer.state,
        postal_code: p.buyer.postal_code,
        country: p.buyer.country
      }
    }
  }
  return UberRUSHClient.createDelivery(deliveryObj)
}

controller.quote = function(product, buyer) {
  var delivery = this.createDeliveryObj(product, buyer)
  //create quote from req
  return delivery.quote()
  .then(quotes => {
    //send back delivery fee, est ETA, delivery
    var quote = quotes[0]

    return {
      uber_delivery_price: quote.fee,
      pickup_eta: quote.pickup_eta,
      dropoff_eta: quote.dropoff_eta
    }
  })
  .catch(err => {
    return err
  })
}

controller.requestDelivery = function(req, res) {
  var product_id = req.body.product_id

  Product.getWithAllRelated(product_id)
  .then(productWithRelatedData => {
    var delivery = controller.createDeliveryObj(productWithRelatedData)
    return delivery.confirm()
  })
  .then(confirmedDelivery => {
    var options = {
      uber_delivery_id: confirmedDelivery.delivery_id,
      uber_delivery_price: confirmedDelivery.fee,
      est_pickup_time_and_date: confirmedDelivery.pickup.eta,
      est_deliver_time_and_date: confirmedDelivery.dropoff.eta
    }
    return Transaction.updateByProductId(product_id, options)
  })
  .then(transaction => {
    res.send(transaction)
  })
}

controller.webhook = function(req, res) {
  // console.log('received uber webhook', req.body)

  var status = req.body.meta.status
  var delivery_id = req.body.meta.resource_id

  if(status === 'en_route_to_pickup') {
    /*
    update associated transaction
      est_pickup_time_and_date
      est_deliver_time_and_date

    notify seller

    notify buyer
    */

    // console.log('STATUS', status);

    Transaction.getTransactionInfo(delivery_id)
    .then(function(transactionData) {
      var product = transactionData.relations.product.attributes;
      var seller = transactionData.relations.seller.attributes;
      var buyer = transactionData.relations.buyer.attributes;
      var transaction = transactionData.attributes;

      twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}`);
      twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}`);
    });
  }

  if(status === 'at_pickup') {
    //notify seller

    // console.log('STATUS', status);

    Transaction.getTransactionInfo(delivery_id)
    .then(function(transactionData) {
      var product = transactionData.relations.product.attributes;
      var seller = transactionData.relations.seller.attributes;
      var buyer = transactionData.relations.buyer.attributes;
      var transaction = transactionData.attributes;

      twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}`);
      twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}`);
    });
  }

  if(status === 'en_route_to_dropoff') {
    /*
    update associated transaction
      actual_pickup_time_and_date
      est_deliver_time_and_date

    notify buyer
    */

    // console.log('STATUS', status);

    Transaction.getTransactionInfo(delivery_id)
    .then(function(transactionData) {
      var product = transactionData.relations.product.attributes;
      var seller = transactionData.relations.seller.attributes;
      var buyer = transactionData.relations.buyer.attributes;
      var transaction = transactionData.attributes;

      twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}`);
      twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}`);
    });  

  }

  if(status === 'at_dropoff') {
    //notify buyer

    // console.log('STATUS', status);

    Transaction.getTransactionInfo(delivery_id)
    .then(function(transactionData) {
      var product = transactionData.relations.product.attributes;
      var seller = transactionData.relations.seller.attributes;
      var buyer = transactionData.relations.buyer.attributes;
      var transaction = transactionData.attributes;

      twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}`);
      twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}`);
    });  

  }

  if(status === 'completed') {
    /*
    update associated transaction
      actual_delivery_time_and_date
      est_deliver_time_and_date
  
    update associated product
      sold => true

    charge buyer
    pay seller


    //notify seller

    */

    // console.log('STATUS', status);

    Transaction.getTransactionInfo(delivery_id)
    .then(function(transactionData) {
      var product = transactionData.relations.product.attributes;
      var seller = transactionData.relations.seller.attributes;
      var buyer = transactionData.relations.buyer.attributes;
      var transaction = transactionData.attributes;

      twilio.sendSms(seller.phone_number, `S-Mart Alert to ${seller.username}: Your recently sold product, ${product.title}, is ${status.split('_').join(' ')}`);
      twilio.sendSms(buyer.phone_number, `S-Mart Alert to ${buyer.username}: Your recently purchased product, ${product.title}, is ${status.split('_').join(' ')}`);
    });  
  }

  // if(status === 'processing') {
  //   console.log('status: ', req.body)
  // }
  // if(status === 'no_couriers_available') {
  //   console.log('status: ', status) 
  // }
  // if(status === 'scheduled') {
  //   console.log('status: ', status)
  // }
  // if(status === 'client_canceled') {
  //   console.log('status: ', status)
  // }
  // if(status === 'returning') {
  //   console.log('status: ', status)
  // }
  // if(status === 'returned') {
  //   console.log('status: ', status)
  // }
  // if(status === 'unable_to_return') {
  //   console.log('status: ', status)
  // }
  // if(status === 'unable_to_deliver') {
  //   console.log('status: ', status)
  // }
  // if(status === 'unknown') {
  //   console.log('status: ', status)
  // }

  res.end();
}

module.exports = controller
