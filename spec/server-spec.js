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
    it('should get a product with its related seller', function(done) {
      // console.log(Product)
      Product.getWithSeller(1)
      .then(p => {
        p.attributes.title.should.equal('macbook pro')
        p.attributes.asking_price.should.equal('200.34')
        p.relations.should.have.property('seller')
        p.relations.seller.attributes.first_name.should.equal('brenner')
        done()
      })
    })
    it('should get a product with its related seller, buyer, and transaction', function(done) {
      // console.log(Product)
      Product.getWithAllRelated(4)
      .then(p => {
        p.attributes.title.should.equal('beanie')
        p.attributes.asking_price.should.equal('7.00')
        p.relations.should.have.property('seller')
        p.relations.seller.attributes.first_name.should.equal('daniel')
        p.relations.should.have.property('buyer')
        p.relations.buyer.attributes.first_name.should.equal('Greg')
        p.relations.should.have.property('transaction')
        p.relations.transaction.attributes.status.should.equal('buyer_paid')
        done()
      })
    })
  })
})

//example req.body:
// {
//   "seller_id": 2,
//   "address": "asfsadg",
//   "address_2": "asdgasfh",
//   "postal_code": "1234124",
//   "buyer_id": 3,
//   "category_id": 2,
//   "title": "asgasdg",
//   "description": "sdfhsdjhgsdfh",
//   "asking_price": "100.11",
//   "imageUrl": ["asdgasfhfshashf"]
// }

describe('API Routes', function() {
  describe('POST routes', function() {
    var product_id;
    it('should post an item', function(done) {
      chai.request(server)
      .post('/api/v1/postitem')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        "seller_id": 2,
        "address": "asfsadg",
        "address_2": "asdgasfh",
        "postal_code": "1234124",
        "category_id": 1,
        "title": "asgasdg",
        "description": "sdfhsdjhgsdfh",
        "asking_price": "100.11",
        "imageUrl": ["asdgasfhfshashf"]
      })
      .end((err, res) => {
        product_id = res.body.id;
        res.should.have.status(200)
        done()
      })
    })
    it('should retrieve an item posted to the db', function(done) {
      chai.request(server)
      .get('/api/v1/getone?id=' + product_id)
      .end((err, res) => {
        // console.log(typeof res.body)
        res.should.have.status(200)
        res.body[0].should.be.a('object')
        res.body[0].id.should.equal(Number(product_id))
        done()
      })
    })
  })
  describe('GET ROUTES', function() {
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
    it('should get a users products', function(done) {
      chai.request(server)
      .get('/api/v1/getuserproducts?user_id=1')
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
    it('should get a users profile', function(done) {
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
  })
})
// beforeEach(function(done) {
//   init('test')
//   .then(() => {
//     return seed('test')
//   })
//   .then(() => {
//     done()
//   })
// })

