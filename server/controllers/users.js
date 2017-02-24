const db = require('../db/db')
var controller = {}

controller.getAll = (req, res) => {
  console.log('getAll products')
  db.User.findAll()
  .then(users => {
    res.json(users)
  })
}

controller.getUserProfile = (req, res) => {
  db.User.where({id: req.query.id}).fetch()
  .then(user => {
    res.json(user)
  })
};

controller.setContactInfo = (req, res) => {
  var profile = db.User.where({id: req.query.id}).fetch()
    .then(model => {
      model.set("physical_address", req.query.address);
      model.set("phone_number", req.query.phone_number);
      model.save()
      res.json(model)
  })

}

module.exports = controller;
