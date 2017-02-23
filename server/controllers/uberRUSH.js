const db = require('../db/db')
const transactionController = require('./transaction')
const UberRUSH = require('uber-rush')
const UberRUSHClient = UberRUSH.createClient({
    client_secret: process.env.UBER_RUSH_SECRET,
    client_id: process.env.UBER_RUSH_ID,
    sandbox: true // No couriers will actually be called if set
})


var createDeliveryObj = function(productWithRelatedData) {
  p = productWithRelatedData
  // console.log(p)
  const deliveryObj = {
    order_reference_id: p.id.toString(),
    item: {
      title: p.attributes.title,
      quantity: p.attributes.quantity,
      is_fragile: false
    },
    pickup: {
      contact: {
        first_name: p.relations.seller.attributes.first_name,
        last_name: p.relations.seller.attributes.last_name,
        phone: {
          number: p.relations.seller.attributes.phone_number
        }
      },
      location: {
        address: p.relations.seller.attributes.address,
        address_2: p.relations.seller.attributes.address_2,
        city: p.relations.seller.attributes.city,
        state: p.relations.seller.attributes.state,
        postal_code: p.relations.seller.attributes.postal_code,
        country: p.relations.seller.attributes.country
      }
    },
    dropoff: {
      contact: {
        first_name: p.relations.buyer.attributes.first_name,
        last_name: p.relations.buyer.attributes.last_name,
        phone: {
          number: p.relations.buyer.attributes.phone_number
        }
      },
      location: {
        address: p.relations.buyer.attributes.address,
        address_2: p.relations.buyer.attributes.address_2,
        city: p.relations.buyer.attributes.city,
        state: p.relations.buyer.attributes.state,
        postal_code: p.relations.buyer.attributes.postal_code,
        country: p.relations.buyer.attributes.country
      }
    }
  }
  return UberRUSHClient.createDelivery(deliveryObj)
}

var controller = {}

controller.getQuote = function(req, res) {
  console.log('getting Quote')

  //create quote from req
  delivery.quote()
  .then(quotes => {
    //send back delivery fee, est ETA, delivery
    return res.json(quotes)
  })
  .then (() => {
    return delivery.confirm()
  })
  .then(confirmation => {
    console.log(confirmation)
  })
  .catch(err => {
    // res.json(err)
  })
}

controller.requestDelivery = function(req, res) {
  console.log('buy uberRUSH')

  var product_id = req.body.product_id

  db.Product.where({id: product_id}).fetch({withRelated: ['transaction', 'seller', 'buyer']})
  .then(productWithRelatedData => {
    var delivery = createDeliveryObj(productWithRelatedData)
    delivery.confirm()
    res.send(delivery)
  })
}

controller.confirmDelivery = function(req, res) {
  //   .then (() => {
  //   return delivery.confirm()
  // })
  // .then(confirmation => {
  //   console.log(confirmation)
  // })
}

controller.webhook = function(req, res) {
  console.log('received uber webhook')

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
  }
  if(status === 'at_pickup') {
    //notify seller
  }
  if(status === 'en_route_to_dropoff') {
    /*
    update associated transaction
      actual_pickup_time_and_date
      est_deliver_time_and_date

    notify buyer
    */
  }
  if(status === 'at_dropoff') {
    //notify buyer
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
  }
  if(status === 'processing') {
    console.log('status: ', req.body)
  }
  if(status === 'no_couriers_available') {
    console.log('status: ', status) 
  }
  if(status === 'scheduled') {
    console.log('status: ', status)
  }
  if(status === 'client_canceled') {
    console.log('status: ', status)
  }
  if(status === 'returning') {
    console.log('status: ', status)
  }
  if(status === 'returned') {
    console.log('status: ', status)
  }
  if(status === 'unable_to_return') {
    console.log('status: ', status)
  }
  if(status === 'unable_to_deliver') {
    console.log('status: ', status)
  }
  if(status === 'unknown') {
    console.log('status: ', status)
  }
}

module.exports = controller

// var delivery = UberRUSHClient.createDelivery({
//       item: {
//           title: 'Chocolate bar',
//           quantity: 1,
//           is_fragile: true
//       },
//       pickup: {
//           contact: {
//               first_name: 'Brenner',
//               last_name: 'Spear',
//               phone: {
//                 number: "+14152229670"
//               }
//           },
//           location: {
//               address: '420 baker st',
//               city: 'San Francisco',
//               state: 'CA',
//               postal_code: '94117',
//               country: 'US'
//           }
//       },
//       dropoff: {
//           contact: {
//               first_name: 'Derek',
//               last_name: 'Young',
//               phone: {
//                 number: "+14152229670"
//               }
//           },
//           location: {
//               address: '944 Market St',
//               city: 'San Francisco',
//               state: 'CA',
//               postal_code: '94102',
//               country: 'US'
//           }
//       }
//   });