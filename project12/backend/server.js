const bodyparser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('./config');
const path = require('path');

//const router = express.Router();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//const FileStore = require('session-file-store')(session);
const User = require('./models/users');

//Route path
const users = require('./routes/api/users');
const cartitems = require('./routes/api/cartitems');
const products = require('./routes/api/products');
const categories = require('./routes/api/categories');
const subcategory = require('./routes/api/subcategory');

const orders = require('./routes/api/orders');


// passport configure
//const passportConfig = require('./config/passport');

  

const app = express();

var MemoryStore =session.MemoryStore;
//dB connection key
const db = require('./config/keys').mongoURI;


//Static directory for image upload
//app.use(express.static(path.join(__dirname, 'public')));
// Body parsing middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());



console.log(db);
//add & configure middleware
app.use(
  session({
   // name : 'sid',
    resave: true,
    saveUninitialized: true,
    secret: 'mysupersecret',
    //cookie: { maxAge: 60000 },
    // store : new MongoStore({
    //   url : db,
    //   autoReconnect : true
    // })
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.authenticate('local'));
// app.use((req,res,next) => {
//   const { userId } = req.session;
//   if(userId){
//     res.locals.user = userId; 
//     // User.findById(userId, (err,user) => {
//     //   if(err) res.json(err);
//     //   user._id === userId;
//     // })
//   }
//   next()
// })


// app.use(session({
//   genid: (req) => {
//     console.log('Inside the session middleware')
//     console.log(req.sessionID)
//     return uuid() // use UUIDs for session IDs
//   },
//   store: new FileStore(),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

  
//app.use(express.session({ secret: 'keyboard cat' }));

//Db connection
mongoose.connect(db, { useNewUrlParser: true }, (err, database) =>{
  if(err)
      return console.error(err);

  const port = 3000;
  app.listen(port, ()=> console.log("hai port"));
  //app.listen(port, ()=> console.log(`Listening on port ${port}`));
});

const checkLogin = (req,res,next) => {
  if(!req.session.userId){
    res.redirect('/login')
  }
  else{
    next()
  }
}
app.get('/',(req,res)=>res.send("MM"))

// Routes
app.use("/api/users", users);
app.use("/api/categories",   categories);
//app.use("/api/subcategory", subcategory);
app.use("/api/products", products);
app.use("/api/cartitems", cartitems);






console.log("In server");
// console.log(req.user);
// console.log(req.session.passport.user);


