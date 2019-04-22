const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('./passport').local;
const User = require('../models/users');
//const keys = require('./keys');
// const LocalStrategy = Strategy.local;
const FacebookStrategy = require('./passport').facebook;


//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// // Load User model
// //const User = require('../models/User');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// passport.serializeUser((user, done) => {
//    console.log("I'm in serialize user");
//   // console.log(user._id);
//   // console.log(user.id);
//   done(null, user.id);
// });


// passport.deserializeUser((id, done) => {
//   console.log("I'm in deserialize user");
//   console.log(id);
//  User.findById(id,(err,user) => {
//   done(err, user);
//  })
// });

passport.use('local',LocalStrategy);
passport.use('facebook',FacebookStrategy)

module.exports = passport;