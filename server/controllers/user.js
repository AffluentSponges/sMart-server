const User = require('../models/user')

module.exports.getAll = (req, res) => {
  User.findAll()
  .then(users => {
    res.json(users)
  })
}

module.exports.getUserProfile = (req, res) => {
  User.where({id: req.query.id}).fetch()
  .then(user => {
    res.json(user)
  })
};

module.exports.checkInfo = (req, res) => {
  var user = req.session.passport.user;

  if (!user.address || !user.postal_code || !user.city || !user.state || !user.phone_number) {
    res.redirect('/account-edit')
  } else {
    res.redirect('/');
  }
  res.end();
};

module.exports.isAuthenticated = (req, res, next) => {
  req.session.passport ? next() : res.redirect('/login');
};

module.exports.setContactInfo = (req, res) => {
  var profile = User.where({id: req.body.id}).fetch()
    .then(model => {
      model.set("address", req.body.address);
      model.set("address_2", req.body.address_2);
      model.set("postal_code", req.body.postal_code);
      model.set("phone_number", req.body.phone_number);
      model.set("wallet_address", req.body.wallet_address);
      model.save()
      res.json(model)
  });
};
