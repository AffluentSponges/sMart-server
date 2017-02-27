const User = require('../models/User')
var controller = {}

controller.getAll = (req, res) => {
  console.log('getAll products')
  User.findAll()
  .then(users => {
    res.json(users)
  })
}

controller.getUserProfile = (req, res) => {
  User.where({id: req.query.id}).fetch()
  .then(user => {
    res.json(user)
  })
};

controller.checkInfo = (req, res) => {
  var user = req.session.passport.user;

  if (!user.address || !user.postal_code || !user.city || !user.state || !user.phone_number) {
    res.redirect('/account-edit')
  } else {
    res.redirect('/');
  }
  res.end();
};

controller.setContactInfo = (req, res) => {
  var profile = User.where({id: req.body.id}).fetch()
    .then(model => {
      model.set("address", req.body.address);
      model.set("address_2", req.body.address_2);
      model.set("postal_code", req.body.postal_code);
      model.set("phone_number", req.body.phone_number);
      model.save()
      res.json(model)
  });
};

module.exports = controller;
