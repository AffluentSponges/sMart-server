require('dotenv').config({path: '../.env'})
const Product = require('../server/models/product')
const axios = require('axios')

helpers = {}

const axiosUber = axios.create({
  baseURL: 'https://sandbox-api.uber.com/v1/sandbox/deliveries/',
  headers: {
    'Content-Type' : 'application/json',
    Authorization: ('Bearer ' + process.env.UBER_RUSH_ACCESS_TOKEN)
  }
})

var changeUberStatus = function(delivery_id, status) {
  // console.log('changeUberStatus')
  // console.log(delivery_id)
  return axiosUber.put(delivery_id, {
    status: status
  })
  .then(response => {
    return response
  })
}
exports.changeUberStatus = changeUberStatus

exports.simulateDelivery = function(delivery_id) {
  return changeUberStatus(deliveryId, 'en_route_to_pickup')
  .then(() => {
    return changeUberStatus(deliveryId, 'at_pickup')
  })
  .then(() => {
    return changeUberStatus(deliveryId, 'en_route_to_dropoff')
  })
  .then(() => {
    return changeUberStatus(deliveryId, 'at_dropoff')
  })
  .then(() => {
    return changeUberStatus(deliveryId, 'completed')
  })
  .then(() => {
    return 'purchase completed'
  })
}