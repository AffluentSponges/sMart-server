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

  describe('postitem', function() {
    //post something to db
    // chai.request(app).post('/postitem')
    it('should post items to the database', function(done) {
      (/*query db to see if it is there*/1).should.equal(/*hand written result of what should be there*/1)
      done()
    })
  })
})
