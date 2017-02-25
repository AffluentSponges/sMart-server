process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const productController = require('../server/controllers/product.js')

// chai.use(chaiHttp)
app = server()
describe('API Routes', function() {

  describe('easy test', function() {
    it('should return 1+1=2', function(done) {
      (1+1).should.equal(2)
      done()
    })
  })

  describe('Products', function() {
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
        console.log(res.body)
        done()
      })

    })
  })

  describe('postitem', function() {
    //post something to db
    // chai.request(app).post('/postitem')
    it('should post items to the database', function(done) {
      (/*query db to see if it is there*/1).should.equal(/*hand written result of what should be there*/1)
      done()
    })
  })
})
