//const JwtStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
//const keys = require('./keys');
const passport = require('passport');


//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// // Load User model
// //const User = require('../models/User');



//module.exports = passport => {
 const strategy =  
    new LocalStrategy({ usernameField: 'mobilenumber', passwordField:'password', passReqToCallback :true }, (req,mobilenumber, password, done) => {
      // Match user
      User.findOne({
        mobilenumber: mobilenumber
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That mobilenumber is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            req.user = user;
            req.isAuthenticated = true;
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })


// exports.isAuthenticated = (req,res,next) => {
//   if(req.isAuthenticated()){
//     return next();
//   }
//   console.log("ENaaaaaaaaaaaaaaaaaaa");
//   res.send("NOT authenticated");
// }


// const opts = {};

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;
// opts.passReqToCallback = true;

// module.exports = passport => {
//     passport.use(
//         new JwtStrategy(opts, (jwt_payolad) => {
//             User.findById(jwt_payload._id)
//                 .then(user => {
//                     if(user){
//                         req.user = user;
//                         console.log("reeeeeeeeeeeeeeq"+req.user);
//                         return done(null, user);
//                     }
//                     return done(null, false);
//                 })
//                 .catch(err => console.log(err));
//         })
//     );
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//       });
    
//       passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//           done(err, user);
//         });
//       });
// }
// const passport = require('passport');

// module.exports = passport =>{passport.serializeUser((user1, done) => {
//     done(null, user1);
//   });

// passport.deserializeUser(function(user1, done) {
   
//       done(null, user1);
   
//   });

//   authenticated = () => {
//       return(req,res,next) => {
//           console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
//           if(req.isAuthenticated()) return next();
//           res.send("Not authenticated");
//       }
//   }
// }

module.exports = strategy;