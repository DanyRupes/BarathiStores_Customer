const bodyparser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('./config');
const path = require('path');
const cors = require('cors');
//const router = express.Router();
const multer = require('multer')
const socket = require('socket.io');
const http = require('http');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//const FileStore = require('session-file-store')(session);
const router = express.Router();

const bcrypt = require('bcrypt');

//Route path
const users = require('./routes/api/users');
const cartitems = require('./routes/api/cartitems');
const products = require('./routes/api/products');
const categories = require('./routes/api/categories');
const subcategory = require('./routes/api/subcategory');

const orders = require('./routes/api/orders');
const preferences = require('./routes/api/preferences');

// passport configure
//const passportConfig = require('./config/passport');

//Models path
const User = require('./models/users');
const Order = require('./models/orders');
const SubCategory = require('./models/subcategory');
const Product = require('./models/products');
const Category = require('./models/category');


//Intitalize express
const app = express();
const server = http.createServer(app)
const io = socket(server);
var MemoryStore =session.MemoryStore;
//dB connection key
const db = require('./config/keys').mongoURI;


//Static directory for image upload
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// allow-cors
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

app.use(
  session({
   // name : 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'mysupersecret',
    cookie: { maxAge: 60000 }
    // store : new MongoStore({
    //   url : db,
    //   autoReconnect : true
    // })
  })
);
// Body parsing middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


console.log(db);
//add & configure middleware


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



//Multer middleware for image upload
// Image upload middleware
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './public/images/categories')},
  filename: (request, file, callback) => {
    callback(null, file.originalname);
}});

const upload = multer({ storage: storage });


  
//app.use(express.session({ secret: 'keyboard cat' }));

//Db connection
mongoose.connect(db, { useNewUrlParser: true }, (err, database) =>{
  if(err)
      return console.error(err);

  const port = 3000;
  server.listen(port, ()=> console.log("hai port"));
  //app.listen(port, ()=> console.log(`Listening on port ${port}`));
});

//socket connection
io.on('connection', socket => {
  console.log("New client connected "+socket.id);
  socket.on("order_list", () => {
    Order.find({}).populate('customer_id').sort('-created').exec((err, orders) => {
      if(err) res.json(err);
      io.sockets.emit("display_orders", orders)
  })
  });

  //Order status update
socket.on("update_status", orderid => {
  Order.findOneAndUpdate({'_id':orderid}, {'$set': {
    'status': req.body.status
}}, (err, order) => {
  if (err) {
    return res.status(400).send({
      error: errorHandler.getErrorMessage(err)
    })
  }
  io.sockets.emit("change_status", order);
})
});

//Get category
socket.on("get_category", () => {
  Category.find({}).sort('-created').exec((err,category) => {
    if(err) res.status(400).json(err);
    io.sockets.emit("display_category", category);
});
});

//Get Subcategory
socket.on("get_subcategory", () => {
  SubCategory.find({}).sort('-created').exec((err,subcategory) => {
    if(err) res.status(400).json(err);
    io.sockets.emit("display_subcategory", subcategory);
});
});

//Get Product
socket.on("get_product", () => {
  Product.find({}).sort('-created').exec((err,product) => {
    if(err) res.status(400).json(err);
    io.sockets.emit("display_product", product);
});
});
});



//Add new user
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
                  .then(user => io.sockets.emit("change_user"))
                  .catch(err => console.log(err));
          });
      });
  });
});

//Add new category
router.post('/addcategory',upload.single('image'), (req,res) => {
  // const {errors, isValid} = validateCategoryInput(req.body);

  // if(!isValid){
  //     return res.status(400).json(errors);
  // }
  var path = "public\\vcm_s_kf_m160_160x90.jpg";
  const newCategory = new Category({
      categoryname : req.body.categoryname,
      displayorder : req.body.displayorder,
      image : path,
      description : req.body.description,
      hidecategory : req.body.hidecategory
  });
  //if()
  if(!req.body._id){
      Category.findOne({ categoryname : req.body.categoryname}).then(category => {
          if(category){
            //  insert
              var path = req.files[0].path;
              var imageName = req.files[0].originalname;
              var imagepath = {};
      
                  imagepath['path'] = path;
                  imagepath['originalname'] = imageName;
                  req.body.image = path;
              Category.findByIdAndUpdate(req.body._id, req.body, (err,category) => {
                  if(err) return res.status(400).json(err);
                  res.json(category);
              });
          }
          else{
              newCategory.save()
              .then(category => io.sockets.emit("change_category"))
              .catch(err => console.log(err));
          }
      });
  }
});

//Add new subcategory
router.post('/addsubcategory',upload.any(), (req,res) => {
  const {errors, isValid} = validateSubCategoryInput(req.body);

  if(!isValid){
      return res.status(400).json(errors);
  }
  var path = "public\\vcm_s_kf_m160_160x90.jpg";
  const newsubCategory = new SubCategory({
      categoryid : req.body.categoryid,
      subcategoryname : req.body.subcategoryname,
      displayorder : req.body.displayorder,
      image : path,
      description : req.body.description,
      hidesubcategory : req.body.hidesubcategory
  });
  //if()
  if(!req.body._id){
      SubCategory.findOne({ subcategoryname : req.body.subcategoryname}).then(subcategory => {
          if(subcategory){
              return res.status(400).json({ subcategoryname : "SubCategory already exists"});
          }
  newsubCategory.save()
  .then(subcategory => res.json(subcategory))
  .catch(err => console.log(err));
});
  }
  // Update Category
  else{
      var path = req.files[0].path;
      var imageName = req.files[0].originalname;
      var imagepath = {};

      imagepath['path'] = path;
      imagepath['originalname'] = imageName;
      req.body.image = path;
      req.body.updated = Date.now();
      SubCategory.findByIdAndUpdate(req.body._id, req.body, (err,subcategory) => {
          if(err) return res.status(400).json(err);
          res.json(subcategory);
      });
  }
});

//

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
app.use("/api/orders", orders);
app.use('/api/preferences', preferences);


app.use('/', router);



console.log("In server");
// console.log(req.user);
// console.log(req.session.passport.user);


