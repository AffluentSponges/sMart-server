process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)

describe('API Routes', function() {
  describe('easy test', function() {
    it('should return 1+1=2', function(done) {
      (1+1).should.equal(2)
      done()
    })
  })
})