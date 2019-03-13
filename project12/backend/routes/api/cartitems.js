const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cart = require('../../models/cartitems');
const Product = require('../../models/products');
const User = require('../../models/users');
const passport = require('../../config');
//require('../../config/passport')(passport);
// require('./users');
// Add items into cart


// router.get('/add-to-cart/:id', function(req, res, next) {
//     var   productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});
  
//     Product.findById(productId, function(err, product) {
//       if (err) {
//         return res.status(400).json(err);
//       }
//       cart.add(product, product.id);
//       req.session.cart = cart;
//       res.json(cart);
//     });
//   });


router.post('/addtocart', (req,res,next) => {
  console.log(req.body)
    // const productId = req.product_id;
    console.log("Am i a getting here");
    console.log(JSON.stringify(req.session.user));
    console.log(req.session.passport);
    if(req.isAuthenticated()){
    var userid = req.user;//mongoose.Types.ObjectId(req.body.userid);
    console.log("req.body.user is"+req.user);
    //console.log("req.user_id is is"+req.user);
    // Cart.find({ user : userid},(err,user) => {
    //         //const total = req.body.amount
    //         if(err)
    //          res.json({err});
    //       //  res.send(user);
    //         if(user.length==0){
    //             console.log( req.body.quantity)
        //     const newUserCart = new Cart({
        //         user :userid,
        //         products : [{
        //             product:req.body.pid,
        //             quantity : req.body.quantity    
        //         }]

        //     });
        //     newUserCart.save()
        //     .then(cart => res.json(cart))
        //     .catch(err => res.send(err));
        // }
       // else{
            
            // user.forEach((u) => {
            //     //console.log(req.params.id);
            //     // if(u.product == req.body.pid){
            //         console.log("hai i'm else");
            //         if(req.body.quantity <= 0){
            //             console.log("Im in quantity")
            //             Cart.findOneAndRemove({user : user, product : u.product}, (err,cart) => {
            //                 if(err)
            //                      res.status(400).json(err);
            //                 res.json(cart);
            //             });
            //         }
                    //var newQuantity = req.body.quantity;
                   //var productid = req.params.id;//mongoose.Types.ObjectId('5c58232f9c6aab1cec1af3dc');
                   // Cart.find({user : userid,product : productid }).then(res => console.log(res)).catch(err=>console.log(err));
                   User.findOne({"_id" : userid, "cart.product" : req.body.pid }).then((out)=>{
                    console.log(out);

                    if (out===null){
                      console.log("come herre");
                        let products = [{
                            product:req.body.pid,
                            quantity : req.body.quantity,
                            amount : req.body.amount
                        }]
                            User.findOneAndUpdate( {"_id":userid} ,{$addToSet : {"cart":products}},{ upsert : true}, (err, cart) => {
                                if(err)
                                console.log(err);
                                     //res.status(400).json(err);
                                res.json(cart);
                            });
                       }
                    
                    else{
                        console.log("Im in else");
                        User.findOneAndUpdate({"_id" : userid, "cart.product" : req.body.pid }, {
                            $set : {"cart.$.quantity": req.body.quantity}},(err,result) => {
                                if(err) res.json(err);
                                res.json(result);
                            }
                            )


                        // res.json(out);
                        // console.log("Im in else");
                    }



                   })
                  }
               
          //  });
            
     //   }
                
    //     for(var i=0;i<user.products.length;i++){
    //        if(req.params.id === user.products.product[i]){

    //     }
    // }
//     });
                  
 });

//displaycart items
router.get('/getcart', (req,res) => {
  User.findOne({_id : req.user}, (err, cart) => {
    if(err) res.status(400).json(err);
      cart.cart.forEach((u) => {
        Product.findOne({_id : u.product}, (err, product) => {
          if(err) res.send("Error in cart product retrieval");

        })
      })
    //res.json(cart.cart);
  })
})



//Reduce quantity

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.json(cart);
  });
  
  //Remove from cart
  router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.removeItem(productId);
    req.session.cart = cart;
    res.json(cart);
  });
  

//Display cart

router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
      return res.json({
        products: null
      });
    }
    var cart = new Cart(req.session.cart);
    res.json({
      products: cart.generateArray(),
      totalPrice: cart.totalPrice
    });
  });


// router.get('/getitems', (req,res) => {
//     Cart.find(userid).then(user => {
//         var totalamount = 0;
//         user.forEach((u) => {    
//             Product.findOne(u.productid, (err, p) => {
//                 if(err)
//                     return res.status(400).json(err);
                
//                     totalamount += u.quantity + p.sellingprice;    
//             })
            
//         })
//         //console.log(totalamount);
//     })
// });
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
      return next();
  else{
      res.redirect('/users/login')
  }
}

module.exports = router;