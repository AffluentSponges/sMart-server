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

controller.checkInfo = (req, res) => {
  // query db to check user session
    // if user has a valid phone number AND address, redirect to '/'
    // if user does not have phone or address, redirect to further registration
  
  // session user
  var user = req.session.passport.user;

  // if any address or phone# info is null, redirect from googleOauth to further registration
  if (!user.address || !user.postal_code || !user.city || !user.state || !user.phone_number) {
    // res.redirect('/furtherRegistration')
  } else {
    // if all info is there, redirect to root '/'
    res.redirect('/');
  }

  // db.User.where({id: sessionUser.id})
  // .fetch()
  // .then(user => {

  // })
  console.log('SESSION === ', req.session.passport.user.id);
  res.redirect('/');
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
