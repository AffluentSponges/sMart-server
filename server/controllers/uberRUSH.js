const db = require('../db/db')
const UberRUSH = require('uber-rush')
const UberRUSHClient = UberRUSH.createClient({
    client_secret: process.env.UBER_RUSH_SECRET,
    client_id: process.env.UBER_RUSH_ID,
    sandbox: true // No couriers will actually be called if set
})


var controller = {}

controller.getQuote = function(req, res) {
  console.log('getting Quote')

  var delivery = UberRUSHClient.createDelivery({
      item: {
          title: 'Chocolate bar',
          quantity: 1,
          is_fragile: true
      },
      pickup: {
          contact: {
              first_name: 'Ryan',
              last_name: 'Cheney',
              phone: {
                number: "+14152229670"
              }
          },
          location: {
              address: '64 Seabring St',
              city: 'Brooklyn',
              state: 'NY',
              postal_code: '11231',
              country: 'US'
          }
      },
      dropoff: {
          contact: {
              first_name: 'Karen',
              last_name: 'Holmes',
              phone: {
                number: "+14152229670"
              }
          },
          location: {
              address: '80 Willoughby St',
              city: 'Brooklyn',
              state: 'NY',
              postal_code: '11201',
              country: 'US'
          }
      }
  });

  delivery.quote()
  .then(quotes => {
    return res.json(quotes)
  })
  .then (() => {
    return delivery.confirm()
  })
  .then(confirmation => {
    console.log(confirmation)
  })
  .catch(err => {
    res.json(err)
  })

  delivery.on('status', status => {
    console.log('Delivery status: ', status)
  })

  delivery.on('dropoff_eta', eta => {
    console.log('The dropoff time is now estimated to be in ' + eta + ' minutes')
  })

  delivery.on('pickup_eta', eta => {
    console.log('Your item will be picked up in approximately ' + eta + ' minutes')
  })

  delivery.on('location', location => {
    console.log('Courier location: ', location); 
  })

}

controller.webhook = function(req, res) {
  console.log('received uber webhook')

  console.log('status: ', req.body.meta.status)
}









module.exports = controller