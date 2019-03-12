const express = require('express');
const Order = require('../../models/orders');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/users');


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

router.post('/adminorder', (req,res) => {
    User.findOne(req.body.mobilenumber).then((out) => {
        console.log(out);
        if(!out) res.json("User id not found");
            
        let neworder = new Order({
            orders :req.body.cart,
            totalamount: req.body.totalamount,
            customer_id : req.user,
            payment_id : "pay1"
            });
                    neworder.save((err,result) => {
                if(err)
                    return res.status(400).json(err);
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

//searchproduct, mobilenumber



//list order by user

router.get('/listorders/:id', (req,res)=> {
    Order.find(req.params.id).sort('-created').exec((err,orders) => {
        if(err)
            return res.status(400).json(err);
        res.json(orders);
    });
});

//

module.exports = router;