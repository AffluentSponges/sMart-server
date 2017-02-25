process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)

describe('API Routes', function() {
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
  })
})