process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const productController = require('../server/controllers/product.js')

chai.use(chaiHttp)


describe('API Routes', function() {

  describe('easy test', function() {
    it('should return 1+1=2', function(done) {
      (1+1).should.equal(2)
      done()
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
        .get('/api/v1/getuserprofile?id=1')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.username.should.equal("brenner-test")
          done()
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
          "buyer_id": 3,
          "category_id": 2,
          "title": "asgasdg",
          "description": "sdfhsdjhgsdfh",
          "asking_price": "100.11",
          "imageUrl": ["asdgasfhfshashf"]
        })
        .end((err, res) => {
          product_id = res.text;
          // console.log(res.text)
          res.should.have.status(200)
          res.text.should.be.a("string")
          done()
        })
      })
      console.log(product_id);
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
})
