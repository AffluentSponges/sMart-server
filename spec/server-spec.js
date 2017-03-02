process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
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

before(function(done) {
  init('test')
  .then(() => {
    return seed('test')
  })
  .then(() => {
    done()
  })
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
        p.asking_price.should.equal('7.00')
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
    it('should buy a product (update 1 product, insert 1 transaction)', function(done) {
      var product_id = 2
      var buyer_id   = 4
      var product
      var buyer
      var transaction

      User.findById(buyer_id)
      .then(b => {
        buyer = JSON.parse(JSON.stringify(b))
        return Product.buyProduct(product_id, buyer_id)
      })
      .then(t => {
        transaction = JSON.parse(JSON.stringify(t))
        return Product.findById(product_id)
      })
      .then(p => {
        product = JSON.parse(JSON.stringify(p))
        product.buyer_id.should.equal(buyer.id)
        product.sold.should.equal(true)
        transaction.buyer_id.should.equal(buyer.id)
        transaction.product_id.should.equal(product.id)
        transaction.sale_price.should.equal(product.asking_price)
        transaction.status.should.equal('received_payment')
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
        delivery.items[0].title.should.equal('beanie')
        delivery.pickup.should.be.an('object')
        delivery.pickup.contact.first_name.should.equal('daniel')
        delivery.pickup.contact.phone.number.should.equal('+11112224444')
        delivery.pickup.location.address.should.equal('944 market st')
        delivery.pickup.location.postal_code.should.equal('94102')
        delivery.dropoff.should.be.an('object')
        delivery.dropoff.contact.first_name.should.equal('Greg')
        delivery.dropoff.contact.phone.number.should.equal('+11112224444')
        delivery.dropoff.location.address.should.equal('556 mission st')
        delivery.dropoff.location.postal_code.should.equal('94117')
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
        delivery.items[0].title.should.equal('macbook pro')
        delivery.pickup.should.be.an('object')
        delivery.pickup.contact.first_name.should.equal('brenner')
        delivery.pickup.contact.phone.number.should.equal('+11112223333')
        delivery.pickup.location.address.should.equal('400 baker st')
        delivery.pickup.location.postal_code.should.equal('94117')
        delivery.dropoff.should.be.an('object')
        delivery.dropoff.contact.first_name.should.equal('Greg')
        delivery.dropoff.contact.phone.number.should.equal('+11112224444')
        delivery.dropoff.location.address.should.equal('556 mission st')
        delivery.dropoff.location.postal_code.should.equal('94117')
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
    it.only('should create a new btc wallet address', function(done) {
      coinbaseController.createAddress()
      .then(address => {
        address.address.should.be.a('string')
        address.account.id.should.equal(process.env.COINBASE_BTC_ACCOUNT)
        address.account.name.should.equal('BTC Wallet')
        address.account.type.should.equal('wallet')
        address.account.currency.should.equal('BTC')
        done()
      })
    })
  })

  describe('Twilio Notification System', function() {
    describe('uberRUSH status updates', function() {
      it('uber_webhook should have status 200', function(done) {
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
    })
  })
})

describe('API Routes', function() {
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
        done()
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
    it('should buy a product', function(done) {
      this.timeout(5000)
      var product_id = 2
      var buyer_id = 2
      chai.request(server)
      .post('/api/v1/buy')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        "product_id": product_id,
        "buyer_id": buyer_id
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.product_id.should.equal(product_id)
        res.body.buyer_id.should.equal(buyer_id)
        res.body.uber_delivery_id.should.be.a('string')
        res.body.uber_delivery_price.should.be.a('number')
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
      this.timeout(3000);
      chai.request(server)
      .get('/api/v1/vision?image_links=https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/bp/mbp13/silver/mbp13-silver-select-201610?wid=452&hei=420&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1477352400929')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.captions.should.be.a('string')
        done()
      })
    }) 

    it('should return Electronics category id from laptop image url', function(done) {
      this.timeout(3000);
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

