process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const session = require('supertest-session');
const server = require('../server')
const GooglePassport = require('passport-google-oauth20');
const {userController,
       productController,
       categoryController,
       transactionController,
       uberRUSHController,
       coinbaseController} = require('../server/controllers')
const {User,
       Product,
       Category,
       Transaction} = require('../server/models')
const init = require('../server/db/init')
const seed = require('../server/db/seed')
const knex = require('knex')

const helper = ('./helper')

chai.use(chaiHttp)
var testSession = null;

before(function(done) {
  // create test session 
  testSession = session(server);

  init('test')
  .then(() => {
    return seed('test')
  })
  .then(() => {
    done()
  })
})

describe('buy-delivery-pay complete lifecycle', function() {
  var data = {
      "id": "d9cc3ee5-567e-5f8d-a031-11194e103d99",
      "type": "wallet:addresses:new-payment",
      "data": 
       { "id": "6c6e3a77-5f34-5bdd-b2fa-fc2840ae87eb",
         "address": "4TdsZvk6ezdvPPtixhW1DRjzNVA8CsLAL7",
         "name": null,
         "created_at": "2017-03-01T18:43:39Z",
         "updated_at": "2017-03-01T18:43:39Z",
         "network": "bitcoin",
         "resource": "address",
         "resource_path": "/v2/accounts/e57d688a-424b-5758-9318-481f2bef8dc3/addresses/6c6e3a77-5f34-5bdd-b2fa-fc2840ae87eb" },
      "user": 
       { "id": "7ad3ae13-82f5-58a0-a4e3-84044f7ceec3",
         "resource": "user",
         "resource_path": "/v2/users/7ad3ae13-82f5-58a0-a4e3-84044f7ceec3" },
      "account": 
       { "id": "e57d688a-424b-5758-9318-481f2bef8dc3",
         "resource": "account",
         "resource_path": "/v2/accounts/e57d688a-424b-5758-9318-481f2bef8dc3" },
      "delivery_attempts": 0,
      "created_at": "2017-03-01T18:44:10Z",
      "resource": "notification",
      "resource_path": "/v2/notifications/d9cc3ee5-567e-5f8d-a031-11194e103d99",
      "additional_data": 
       { "hash": "ba95c9dd9a2faebe63025a29ec1dc077ae5ee6dc5b065ae0978dcb5cc13fd6ce",
         "amount": { "amount": "0.00408", "currency": "BTC" },
         "transaction": 
          { "id": "13f07688-c6dc-539d-aacc-5c08288b1481",
            "resource": "transaction",
            "resource_path": "/v2/accounts/e57d688a-424b-5758-9318-481f2bef8dc3/transactions/13f07688-c6dc-539d-aacc-5c08288b1481"
          }
        }
      }
  var uber_delivery_id
  it('should initiate a purchase (attempt)', function(done) {
    var product_id = 7
    var buyer_id = 2
    chai.request(server)
    .post('/api/v1/attempt_purchase')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      "product_id": product_id,
      "buyer_id": buyer_id
    })
    .end((err, res) => {
      res.should.have.status(200)
      res.body.message.should.equal('waiting for coinbase payment')
      res.body.BTC.should.be.a('string')
      Product.findById(product_id)
      .then(product => {
        parseInt(product.attributes.total_price_btc).should.be.a('number')
        done()
      })
    })
  })
  it('should trigger the buying process via webhook for new-payment', function(done) {
    chai.request(server)
    .post('/coinbase_webhook')
    .set('content-type', 'application/json')
    .send(data)
    .end((err, res) => {
      Transaction.getWithAllRelated(res.body.id)
      .then(t => {
        transaction = JSON.parse(JSON.stringify(t))
        transaction.buyer_id.should.not.be.null
        transaction.coinbase_address_id.should.equal(data.data.id)
        transaction.coinbase_transaction_id.should.equal(data.additional_data.transaction.id)
        transaction.currency.should.equal(data.additional_data.amount.currency)
        transaction.sale_price_btc.should.equal(data.additional_data.amount.amount)
        transaction.status.should.equal('received_payment')
        transaction.uber_delivery_id.should.be.a('string')
        transaction.product.bitcoin_address.should.equal(data.data.address)
        transaction.product.sold.should.equal(true)
        transaction.product.buyer_id.should.not.be.null

        uber_delivery_id = transaction.uber_delivery_id
        done()
      })
    })
  })
  it('should simulate a delivery', function(done) {
    helper.simulateDelivery(uber_delivery_id)
    .then(response => {
      response.should.equal('purchase completed')
    })
  })
  
})









