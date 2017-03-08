require('dotenv').config({path: '../.env'})
const changeUberStatus = require('./helper').changeUberStatus
const Product = require('../server/models/product')

const productId = process.argv[2]
var deliveryId

const wait = function(t) {
  var time = t || 1000
  return new Promise(function(resolve, reject) {
    setTimeout(() => {resolve()}, time)
  }) 
}

const waitTime = 5000

Product.getWithAllRelated(productId)
.then(product => {
  // console.log(product.relations.transaction)
  deliveryId = product.relations.transaction.attributes.uber_delivery_id
  return changeUberStatus(deliveryId, 'en_route_to_pickup')
})
.then(() => {
  return wait(waitTime)
})
.then(() => {
  return changeUberStatus(deliveryId, 'at_pickup')
})
.then(() => {
  return wait(waitTime)
})
.then(() => {
  return changeUberStatus(deliveryId, 'en_route_to_dropoff')
})
.then(() => {
  return wait(waitTime)
})
.then(() => {
  return changeUberStatus(deliveryId, 'at_dropoff')
})
.then(() => {
  return wait(waitTime)
})
.then(() => {
  return changeUberStatus(deliveryId, 'completed')
})
.then(() => {
  process.exit()
})