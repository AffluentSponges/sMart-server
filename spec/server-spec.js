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


// TODO
describe('login, registration, and auth with sessions', function() {
  
})

describe('Model Methods (Read only)', function() {
  describe('Product Methods', function() {
    it('should return a product with its related seller', function(done) {
      Product.getWithSeller(1)
      .then(product => {
        var p = JSON.parse(JSON.stringify(product))
        p.title.should.equal('macbook pro')
        p.asking_price.should.equal('200.34')
        p.should.have.property('seller')
        p.seller.first_name.should.equal('brenner')
        done()
      })
    })
    it('should return a product with its related seller, buyer, and transaction', function(done) {
      Product.getWithAllRelated(4)
      .then(product => {
        var p = JSON.parse(JSON.stringify(product))
        p.title.should.equal('beanie')
        p.asking_price.should.equal('0.10')
        p.should.have.property('seller')
        p.seller.first_name.should.equal('daniel')
        p.should.have.property('buyer')
        p.buyer.first_name.should.equal('Greg')
        p.should.have.property('transaction')
        p.transaction.status.should.equal('buyer_paid')
        done()
      })
    })
    it('should return all products of a seller', function(done) {
      var seller_id = 1
      Product.getAllBySellerId(seller_id)
      .then(products => {
        var pArray = JSON.parse(JSON.stringify(products))
        pArray.should.be.an('array')
        for(var i=0; i <pArray.length; i++) {
          pArray[i].seller_id.should.equal(seller_id)
          pArray[i].address.should.not.be.null
          pArray[i].sold.should.not.be.null
          pArray[i].image_links.should.be.an('array')
        }
        done()
      })
    })
  })
})

describe('Model Methods (Insert/Update)', function() {
  this.timeout(5000)
  after(function(done) {
    init('test')
    .then(() => {
      return seed('test')
    })
    .then(() => {
      done()
    })
  })
  describe('Product Methods', function() {
    it('should update a product with an attempted_buyer_id', function(done) {
      var product_id = 2
      var attempted_buyer_id = 4
      Product.attemptPurchase(product_id, attempted_buyer_id)
      .then(p => {
        product = JSON.parse(JSON.stringify(p))
        product.attempted_buyer_id.should.equal(attempted_buyer_id)
        should.equal(product.sold, null)
        done()
      })
    })
    it('should not update a product if it already has an attempted_buyer_id', function(done) {
      var product_id = 2
      var attempted_buyer_id = 3
      Product.attemptPurchase(product_id, attempted_buyer_id)
      .then(p => {
        product = JSON.parse(JSON.stringify(p))
        product.attempted_buyer_id.should.not.equal(attempted_buyer_id)
        done()
      })
    })
    it('should complete a purchase of a product given a btc address', function(done) {
      var bitcoin_address = '1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW'
      Product.completePurchase(bitcoin_address)
      .then(p => {
        product = JSON.parse(JSON.stringify(p))
        product.buyer_id.should.equal(product.attempted_buyer_id)
        product.sold.should.equal(true)
        done()
      })
    })
  })
  describe('Transaction Methods', function() {
    it('should create a new transaction based on a product & btc payment', function(done) {
      var info = {
        coinbase_address_id: '6c6e3a77-5f34-5bdd-b2fa-fc2840ae87eb',
        amount: '0.00008287',
        currency: 'BTC',
        coinbase_transaction_id: '13f07688-c6dc-539d-aacc-5c08288b1481'
      }
      var product

      Product.findById(1)
      .then(p => {
        product = JSON.parse(JSON.stringify(p))
        return Transaction.addNewTransaction(p, info)
      })
      .then(t => {
        var transaction = JSON.parse(JSON.stringify(t))
        transaction.buyer_id.should.equal(product.buyer_id)
        transaction.product_id.should.equal(product.id)
        transaction.sale_price.should.equal(product.asking_price)
        transaction.status.should.equal('received_payment')
        transaction.coinbase_address_id.should.equal(info.coinbase_address_id)
        transaction.sale_price_btc.should.equal(info.amount)
        transaction.currency.should.equal(info.currency)
        transaction.coinbase_transaction_id.should.equal(info.coinbase_transaction_id)
        done()
      })
    })
  })
})

describe('Controllers', function() {
  describe('UberRUSH', function() {
    it('should return an Uber delivery object from a product with a buyer', function(done) {
      Product.getWithAllRelated(4)
      .then(product => {
        var delivery = uberRUSHController.createDeliveryObj(product)
        delivery.updateInterval.should.be.a('number')
        delivery.items.should.be.an('array')
        delivery.items[0].title.should.be.equal('beanie')
        delivery.pickup.should.be.an('object')
        delivery.pickup.contact.first_name.should.be.equal('daniel')
        delivery.pickup.contact.phone.number.should.be.equal('+11112224444')
        delivery.pickup.location.address.should.be.equal('944 market st')
        delivery.pickup.location.postal_code.should.be.equal('94102')
        delivery.dropoff.should.be.an('object')
        delivery.dropoff.contact.first_name.should.be.equal('Greg')
        delivery.dropoff.contact.phone.number.should.be.equal('+11112224444')
        delivery.dropoff.location.address.should.be.equal('556 mission st')
        delivery.dropoff.location.postal_code.should.be.equal('94117')
        done()
      })
    })
    it('should return an Uber delivery object from a product and a potential buyer', function(done) {
      var product
      Product.getWithAllRelated(1)
      .then(p => {
        product = p
        return User.findById(3) 
      })
      .then(potentialBuyer => {
        var delivery = uberRUSHController.createDeliveryObj(product, potentialBuyer)
        delivery.updateInterval.should.be.a('number')
        delivery.items.should.be.an('array')
        delivery.items[0].title.should.be.equal('macbook pro')
        delivery.pickup.should.be.an('object')
        delivery.pickup.contact.first_name.should.be.equal('brenner')
        delivery.pickup.contact.phone.number.should.be.equal('+11112223333')
        delivery.pickup.location.address.should.be.equal('400 baker st')
        delivery.pickup.location.postal_code.should.be.equal('94117')
        delivery.dropoff.should.be.an('object')
        delivery.dropoff.contact.first_name.should.be.equal('Greg')
        delivery.dropoff.contact.phone.number.should.be.equal('+11112224444')
        delivery.dropoff.location.address.should.be.equal('556 mission st')
        delivery.dropoff.location.postal_code.should.be.equal('94117')
        done()
      })
    })
  })
  describe('Coinbase', function() {
    var data = {
      "id": "d9cc3ee5-567e-5f8d-a031-11194e103d99",
      "type": "wallet:addresses:new-payment",
      "data": 
       { "id": "6c6e3a77-5f34-5bdd-b2fa-fc2840ae87eb",
         "address": "1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW",
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
         "amount": { "amount": "1.23456789", "currency": "BTC" },
         "transaction": 
          { "id": "13f07688-c6dc-539d-aacc-5c08288b1481",
            "resource": "transaction",
            "resource_path": "/v2/accounts/e57d688a-424b-5758-9318-481f2bef8dc3/transactions/13f07688-c6dc-539d-aacc-5c08288b1481"
          }
        }
      }
    // ^I like to shrink this to one line
    it('should convert USD to BTC', function(done) {
      coinbaseController.convertCurrency(1000)
      .then(tx => {
        tx.should.be.a('string')
        done()
      })
    })
    xit('should send BTC to an address', function(done) {
      coinbaseController.sendBTC('1LYbfZzJN45HYocUJxkK5WDNhxB5MN27XK', '0.0001')
      .then(tx => {
        tx.should.be.an('object')
        done()
      })
    })
    it('should create a new btc wallet address', function(done) {
      coinbaseController.createAddress()
      .then(address => {
        address.address.should.be.a('string')
        address.account.id.should.equal(process.env.COINBASE_BTC_ACCOUNT)
        // address.account.name.should.equal('My Wallet')
        address.account.type.should.equal('wallet')
        address.account.currency.should.equal('BTC')
        done()
      })
    })
    it('should pull out only useful data from the webhook payload for new-payment', function(done) {
      var info = coinbaseController.prunePayload(data)
      info.coinbase_address_id.should.equal(data.data.id)
      info.amount.should.equal(data.additional_data.amount.amount)
      info.currency.should.equal(data.additional_data.amount.currency)
      info.coinbase_transaction_id.should.equal(data.additional_data.transaction.id)
      done()
    })
    it.only('should trigger the buying process via webhook for new-payment', function(done) {
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
          console.log(transaction.uber_delivery_id)
          done()
        })
      })
    })
    it('should fail the buying process via webhook for new-payment due to not enough btc', function(done) {
      //change it to not enough btc
      data.additional_data.amount.amount = 0.01234
      chai.request(server)
      .post('/coinbase_webhook')
      .set('content-type', 'application/json')
      .send(data)
      .end((err, res) => {
        // console.log(res.body)
        res.body.message.should.equal('error, not enough btc...')
        //change it back
        data.additional_data.amount.amount = 1.123456789
        done()
      })
    })
  })
  describe('Twilio Notification System', function() {
    describe('uberRUSH status updates', function() {
      it('Status: "en_route_to_pickup" should have status 200', function(done) {
        chai.request(server)
        .post('/uber_webhook')
        .set('content-type', 'application/json')
        .send({
          "meta": {
            "status": "en_route_to_pickup",
            "resource_id": 1
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
        done();
      })
      it('Status: "at_pickup" should have status 200', function(done) {
        chai.request(server)
        .post('/uber_webhook')
        .set('content-type', 'application/json')
        .send({
          "meta": {
            "status": "at_pickup",
            "resource_id": 1
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
        done();
      })
      it('Status: "en_route_to_dropoff" should have status 200', function(done) {
        chai.request(server)
        .post('/uber_webhook')
        .set('content-type', 'application/json')
        .send({
          "meta": {
            "status": "en_route_to_dropoff",
            "resource_id": 1
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
        done();
      })
      it('Status: "at_dropoff" should have status 200', function(done) {
        chai.request(server)
        .post('/uber_webhook')
        .set('content-type', 'application/json')
        .send({
          "meta": {
            "status": "at_dropoff",
            "resource_id": 1
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
        done();
      })
    })
  })

  describe('uberRUSH delivery and coinbase transaction', function(done) {
    it('Should trigger coinbase transaction after successful delivery', function(done) {
      chai.request(server)
      .post('/uber_webhook')
      .set('content-type', 'application/json')
      .send({
        "meta": {
          "status": "completed",
          "resource_id": 1
        }
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
      })
      done();
    })
  })
})

describe('API Routes', function() {
  this.timeout(5000)
  var product_id;
  after(function(done) {
    init('test')
    .then(() => {
      return seed('test')
    })
    .then(() => {
      done()
    })
  })
  describe('POST routes', function() {
    it('should insert an item', function(done) {
      chai.request(server)
      .post('/api/v1/postitem')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        "seller_id": 2,
        "address": "322 Mission st",
        "address_2": "apt 205",
        "postal_code": "94102",
        "category_id": 1,
        "title": "a paper bag",
        "description": "very big",
        "asking_price": "100.11",
        "image_links": ["amazon.s3.pics.com"]
      })
      .end((err, res) => {
        product_id = res.body.id;
        res.body.should.have.property('id')
        res.body.id.should.be.an('number')
        res.should.have.status(200)
        done()
      })
    })
    it('should initiate a purchase (attempt)', function(done) {
      var product_id = 2
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
    it('should initiate a purchase (attempt) & fail', function(done) {
      var product_id = 2
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
        res.body.message.should.equal('Someone already bought this item')
        done()
      })
    })
  })

  describe('GET ROUTES', function() {
    it('should return the single product just posted', function(done) {
      chai.request(server)
      .get('/api/v1/product?id=' + product_id)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.id.should.equal(Number(product_id))
        done()
      })
    })
    it('should return all products', function(done) {
      chai.request(server)
      .get('/api/v1/products')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body[0].should.have.property('seller_id')
        res.body[0].should.have.property('buyer_id')
        res.body[0].should.have.property('category_id')
        res.body[0].city.should.equal('San Francisco')
        done()
      })
    })
    it('should return all categories', function(done) {
      chai.request(server)
      .get('/api/v1/categories')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body[0].should.have.property('parent_category_id')
        res.body[0].name.should.be.a('string')
        done()
      })
    })
    it('should return all products of a seller', function(done) {
      chai.request(server)
      .get('/api/v1/getuserproducts?seller_id=1')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        for(var i = 0; i < res.body.length; i++) {
          res.body[i].seller_id.should.equal(1)
        }
        res.body[0].should.have.property('category_id')
        done()
      })
    })
    it('should return a users profile', function(done) {
      chai.request(server)
      .get('/api/v1/getuserprofile?id=4')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.username.should.equal("mark-test")
        done()
      })
    })
    it('should return an uberRUSH quote', function(done) {
      chai.request(server)
      .get('/api/v1/product/get_quote?product_id=1&buyer_id=3')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        const quote = res.body
        quote.uber_delivery_price.should.be.a('number')
        quote.pickup_eta.should.be.a('number')
        quote.dropoff_eta.should.be.a('number')
        done()
      })
    })

    xit('should return a title of a given image url', function(done) {
      chai.request(server)
      .get('/api/v1/vision?image_links=https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/bp/mbp13/silver/mbp13-silver-select-201610?wid=452&hei=420&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1477352400929')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.captions.should.be.a('string')
        done()
      })
    }) 

    xit('should return Electronics category id from laptop image url', function(done) {
      chai.request(server)
      .get('/api/v1/vision?image_links=https://cnet1.cbsistatic.com/img/hu-by7YBD22hiXFqkorB2xKbcdw=/770x578/2016/11/04/b88dcfca-056b-4f74-aeb1-84da826ead0b/apple-macbook-pro-with-touch-bar-13-inch-2016-39.jpg')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.category_id.should.equal(3)
        done()
      })
    })
  })
})