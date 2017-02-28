process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const {userController,
       productController,
       categoryController,
       transactionController} = require('../server/controllers')
const {User,
       Product,
       Category,
       Transaction} = require('../server/models')
const init = require('../server/db/init')
const seed = require('../server/db/seed')
const knex = require('knex')
chai.use(chaiHttp)

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
  describe('Product Methods', function() {
    xit('should buy a product (update 1 product, insert 1 transaction)', function(done) {
      //TODO
      done()
    })
  })
  describe('Transaction Methods', function() {
    xit('should add a new transaction to the specified product', function(done) {
      //TODO
      done()
    })
  })
})

describe('Controllers', function() {
  describe('UberRUSH', function() {
    xit('should return an Uber delivery object from a product with a buyer', function(done) {
      //@TODO
      done()
    })
    xit('should return an Uber delivery object from a product and a potential buyer', function(done) {
      //@TODO
      done()
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
    xit('should buy a product', function(done) {
      chai.request(server)
      .get('/api/v1/buy?product_id=3&buyer_id=4')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        // TODO
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
    xit('should return an uberRUSH quote', function(done) {
      chai.request(server)
      .get('/api/v1/product/get_quote?product_id=3&buyer_id=4')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        // @TODO
        done()
      })
    })
  })
})


