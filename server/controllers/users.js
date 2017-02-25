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
  var profile = db.User.where({id: req.body.id}).fetch()
    .then(model => {
      model.set("address", req.body.address);
      model.set("address_2", req.body.address_2);
      model.set("postal_code", req.body.postal_code);
      model.set("phone_number", req.body.phone_number);
      model.save()
      res.json(model)
  })

}

module.exports = controller;
