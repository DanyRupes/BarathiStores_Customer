const express =require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('../../config');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const auth = require('../../config/auth');
const User = require('../../models/users');

const router = express.Router();
// require('../../config/passport')(passport);


// passport.serializeUser(function(user, done) {
//     console.log("I'm in serialize user");
//     console.log(user._id);
//     console.log(user.id);
//    done(null, user.id);
//  });
 
//  passport.deserializeUser(function(id, done) {
//    console.log("I'm in deserialize user");
//   User.findById(id,(err,user) => {
//    done(err, user);
//   })
    
  
//  });
 
// router.get('/', (req,res) => {
//     console.log("Finalyyyyyyyyyyyy");
//     console.log(req.user);
//     console.log(req.isAuthenticated());
//     res.json(req.user);
// })

// @route POST register
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ mobilenumber : req.body.mobilenumber}).then(user => {
        if(user){
            return res.status(400).json({ mobilenumber : "Mobile number already registerd"});
        }
        const newUser = new User({
         //   role : req.body.role,
            name: req.body.name,
            mobilenumber : req.body.mobilenumber,
            email : req.body.email,
            password : req.body.password,
            address : req.body.address,
            landmark : req.body.landmark
        });

        //Hashing password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
        // res.status(200).json({
        //     message: "Successfully signed up!"
        //   });
    });
});

//Login User
 router.post('/login',(req,res,next) => {
     passport.authenticate('local', {session : true}, (err,user) => {
         if(err) return next(err);
         if(!user) res.send("Invalid credentials");
         //req.session.userId = user._id;
         req.login(user, {}, (err) => {
             if(err) return next(err);
             console.log("I'm in req.login");
             req.session.userId = user._id;
             
             console.log(`req.sessio.user:${JSON.stringify (req.sessionID)}`);
             console.log(`req.sessio.userID:${JSON.stringify (req.session.userId)}`);
             console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
             console.log(req);

             
            res.send("Login successfull")
            //     req.session.save((err) => {
            //         if(err) {
            //             return next(err);
            //         }
            //         console.log("Im in express session");    
            // });
           // res.redirect('/listcategory');
         })
     })(req,res,next);
     
//     console.log("Request received");

//     const {errors, isValid} = validateLoginInput(req.body);

//     if(!isValid){
//         return res.status(400).json(errors);
//     }
    
//      const mobilenumber = req.body.mobilenumber;
//      const password = req.body.password;

//         User.findOne({mobilenumber}).then(user => {
//             if(!user){
//                 return res.status(400).json({mobilenumbernotfound:"Mobile number is incorrect"});
//             }
//             bcrypt.compare(password, user.password).then(isMatch => {
//                 if(isMatch){
//                    // create JWT payload
//                     const payload = {
//                         id : user._id,
//                         name : user.name
//                     };
//                     const user1 = user._id;
//                     console.log("User._id is : -----"+user1);
//                     req.login(user1, (err)=>{
//                         if(err) res.status(400).json(err);
//                         //console.log("The result is of user is is is is "+result)
//                         console.log(req.user);
//                         res.send("req.user is"+req.user);
//                     })
        
//                     // jwt.sign(payload, keys.secretOrKey, { expiresIn : 31556926}, (err, token) => {
//                     //     console.log("reqqqqqqqqqqqqqqqqqq"+req.user);
//                     //     res.json({
//                     //         success : true,
//                     //         token : "Bearer " + token
//                     //     });
//                     // });

//                 }else{
//                     return res.status(400).json({ passwordincorrect : "Password incorrect"});
//                 }
//             });
        
//         });
        // passport.authenticate('local', {session:true},(err, passportUser, info) => {
        //         if(err) {
        //           return next(err);
        //         }
        //     console.log("I'm in passport authenticate");
        //         if(passportUser) {
        //           const user = passportUser;
        //           console.log("user is :"+user);
        //           console.log("req.user is : "+ req.user);
        //           user.token = passportUser.generateJWT();
        //             console.log("USer.token is "+user.token);
        //           return res.json({ user: user.toAuthJSON() });
        //         }
            
        //         return status(400).info;
        //       })(req, res);
            });
    

//Set current user
// router.get('/currentuser', passport.authenticate("jwt", { session : false }), (req,res) => {
//     console.log("I'm in passport authenticate current user")
//     res.json({
//         id : req.user.id,
//         name : req.user.name,
//         //email : req.user.email
//     });
// });

//Update address and landmark

router.put('/updateaddress/:id', (req, res) => {

    // const {errors, isValid} = validateAddressInput(req.body);

    // if(!isValid){
    //     return res.status(400).json(errors);
    // }
        // const newAddress = new User({
        //         address : req.body.address,
        //         landmark : req.body.landmark
        // });
    req.body.updated = Date.now();
    User.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true, useFindAndModify: true}, (err, user) => {
        if(err){
            return res.status(400).json({usernotfound:"User not found"});
        }
        res.json(user);
    });

    });


//List all users
router.get('/userlist' , (req , res) => {
    User.find({}).sort('-created').exec((err,users) => {
        if(err)
            return next(err);
        res.json(users);
    });
});          


//Edit user
router.put('/edituser/:id', (req,res,next) => {
    User.findByIdAndUpdate(req.params.id, (err,user) => {
        if(err)
            return next(err);
        res.json(user);
    });
});

//Display a single user
router.get('/getuser/:id', (req,res) =>{
    User.findById(req.params.id, (err, user) => {
        if(err) return next(err);
        res.json(user);
    })
})

//Delete user
router.delete('/deleteuser/:id', (req,res,next) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err)
            return next(err);
        res.json(user);
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


module.exports = router;