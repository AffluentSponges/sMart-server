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
      .then(p => {
        p.attributes.title.should.equal('macbook pro')
        p.attributes.asking_price.should.equal('200.34')
        p.relations.should.have.property('seller')
        p.relations.seller.attributes.first_name.should.equal('brenner')
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
      Product.getAllBySellerId(1)
      .then(products => {
        var pArray = JSON.parse(JSON.stringify(products))
        pArray.should.be.an('array')
        done()
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
  })
  describe('GET ROUTES', function() {
    it('should return the single product just posted', function(done) {
      chai.request(server)
      .get('/api/v1/getone?id=' + product_id)
      .end((err, res) => {
        res.should.have.status(200)
        res.body[0].should.be.a('object')
        res.body[0].id.should.equal(Number(product_id))
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
    it('should return a title of a given image url', function(done) {
      chai.request(server)
      .get('/api/v1/vision?image_links=https://cnet1.cbsistatic.com/img/hu-by7YBD22hiXFqkorB2xKbcdw=/770x578/2016/11/04/b88dcfca-056b-4f74-aeb1-84da826ead0b/apple-macbook-pro-with-touch-bar-13-inch-2016-39.jpg')
      .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.captions.should.be.a('string')
        done()
      })
    }) 
  })
})


