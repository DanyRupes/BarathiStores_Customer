const express = require('express');
const Order = require('../../models/orders');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/users');
const Product = require('../../models/products')

//Create order
router.post('/addorder', (req,res) => { 
    // let products = [{
    //     product:req.body.pid,
    //     quantity : req.body.quantity
    // }]
    var userid = mongoose.Types.ObjectId(req.body.user);

    User.findOne(userid).then((out) => {
    console.log(out.cart);
        
    let neworder = {
        o_products :out.cart,
        totalamount: 3000,
        payment_id : "pay1"
        };
        
        // order.save((err,result) => {
        //     if(err)
        //         return res.status(400).json(err);
        //     res.json(result);
        // });
        
        User.findOneAndUpdate( {"_id":userid} ,{$addToSet : {
            "orders" : neworder
        }},{ upsert : true}, (err, cart) => {
            if(err)
            console.log(err);
                 //res.status(400).json(err);
            User.findOneAndUpdate({"_id":userid}, {$unset : {"cart": ""}},(err,removecart) => {
                if(err) res.json(err);
                res.json(removecart);
            })
        });
    })   
});

//Admin order route

router.post('/placeorder', (req,res) => {
    console.log("Im in place order backend/////////////////////", req.body.items)
    //var userid = mongoose.Types.ObjectId(req.body.user);
    console.log("req.body.totalamount", req.body.total)
    console.log(req.user);
    User.findOne({_id :req.user}).then((out) => {
        console.log("varuthaa")
        console.log(out);
        if(!out) res.json("User id not found");
            console.log("///////////////////"+out.cart);
       // out.cart.product
        
        let neworder = new Order({
            orders :req.body.items,
            totalamount: req.body.total,
            customer_id : req.user,
            payment_id : "pay1"
            });
            neworder.save((err,result) => {
                if(err)
                    return res.status(400).json(err);
                    // User.findOneAndUpdate({"_id":req.user}, {$unset : {"cart": ""}},(err,removecart) => {
                    //     if(err) res.json(err);
                    //         res.json(removecart);
                    // })
                res.json(result);
            });

            // User.findOneAndUpdate( {"mobilenumber": req.body.mobilenumber} ,{$addToSet : {
            //     "orders" : neworder
            // }},{ upsert : true}, (err, cart) => {
            //     if(err)
            //     console.log(err);
            //          //res.status(400).json(err);
            //     User.findOneAndUpdate({"_id":userid}, {$unset : {"cart": ""}},(err,removecart) => {
            //         if(err) res.json(err);
            //         res.json(removecart);
            //     })
            // });

        });
})

//Admin placing order
router.post('/adminplaceorder', (req,res) => {
    console.log("Im in place order backend/////////////////////", req.body.items)
    //var userid = mongoose.Types.ObjectId(req.body.user);
    console.log("req.body.totalamount", req.body.total)
    console.log(req.user);
    User.findOne({mobilenumber : req.mobilenumber},(err,out) => {
        console.log("varuthaa")
        console.log(out);
        if(!out) res.json("User id not found");
            console.log("///////////////////"+out.cart);
            res.json("Mobile number not found")
       // out.cart.product
        
        let neworder = new Order({
            orders :req.body.items,
            totalamount: req.body.total,
            customer_id : out._id,
            payment_id : "pay1"
            });
            neworder.save((err,result) => {
                if(err)
                    return res.status(400).json(err);
                    // User.findOneAndUpdate({"_id":req.user}, {$unset : {"cart": ""}},(err,removecart) => {
                    //     if(err) res.json(err);
                    //         res.json(removecart);
                    // })
                res.json(result);
            });

            // User.findOneAndUpdate( {"mobilenumber": req.body.mobilenumber} ,{$addToSet : {
            //     "orders" : neworder
            // }},{ upsert : true}, (err, cart) => {
            //     if(err)
            //     console.log(err);
            //          //res.status(400).json(err);
            //     User.findOneAndUpdate({"_id":userid}, {$unset : {"cart": ""}},(err,removecart) => {
            //         if(err) res.json(err);
            //         res.json(removecart);
            //     })
            // });

        });
})



//Update Status Values

router.post('/updatestatus/:id', (req,res) => {
    Order.findOneAndUpdate({'_id':req.params.id}, {'$set': {
        'status': req.body.status
    }}, (err, order) => {
      if (err) {
        return res.status(400).send({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(order)
    })
})

//searchproduct, mobilenumber

//show My orders
router.get('/myorders', (req,res) => {
    Order.find(req.user).sort('-created').exec((err,myorder) => {
        if(err) res.status(400).json(err);
        res.json(myorder);
    })
})

// //List all orders
// router.get('/allorders', (req,res) => {
//     Order.find({}).sort('-created').exec((err, allorders) => {
//         if(err) res.status(400).json(err);
//         res.json(allorders);
//     })
// })
//

//Get status Values
router.get('/getstatus', (req,res) => {
    res.json(Order.schema.path('status').enumValues)
})

router.get('/allorders', (req,res) => {
    console.log(":::::::::::::::::::::::::::::::::::::::")
    Order.find({}).populate('customer_id').sort('-created').exec((err, orders) => {
        if(err) res.json(err);
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
       // console.log(orders.name)
       // console.log(orders.totalamount)
        res.json(orders)
    })
})

//list order by user
router.get('/listorders/', (req,res)=> {
    Order.find(req.params.id).sort('-created').exec((err,orders) => {
        if(err)
            return res.status(400).json(err);
        res.json(orders);
    });
});

//

module.exports = router;