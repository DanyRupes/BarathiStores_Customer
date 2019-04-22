//const JwtStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
//const keys = require('./keys');

const FacebookStrategy = require('passport-facebook').Strategy;

//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// // Load User model
// //const User = require('../models/User');

const local =
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
  

    /**
 * Sign in with Facebook.
 */
//console.log(process.env.FACEBOOK_ID)
const facebook =  new FacebookStrategy({
  clientID: '317519265576997',
  clientSecret: 'b9792c78091f90bbba3308294043a6b5',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  console.log("I;m getinng............'';;;;;;;;;';'',vgdsxbgdbdbd'';'';';'';';'';")
  if (req.user) {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
       // req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.save((err) => {
            //req.flash('info', { msg: 'Facebook account has been linked.' });
            console.log("User registered.........................")
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
         // req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = profile._json.gender;
          user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save((err) => {
            console.log("Successsssssssssssssssssss")
            done(err, user);
          });
        }
      });
    });
  }
});

module.exports = {local, facebook}

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

