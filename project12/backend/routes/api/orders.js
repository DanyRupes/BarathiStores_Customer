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
    var userid = mongoose.Types.ObjectId(req.body.user);
    User.findOne(userid).then((out) => {
        console.log(out);
        if(!out) res.json("User id not found");
            console.log("///////////////////"+out.cart);
        out.cart.product
        
        let neworder = new Order({
            orders :out.cart,
            totalamount: req.body.totalamount,
            customer_id : userid,
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

//show My orders
router.get('/myorders', (req,res) => {
    Order.find(req.user).sort('-created').exec((err,myorder) => {
        if(err) res.status(400).json(err);
        res.json(myorder);
    })
})

//List all orders
router.get('/allorders', (req,res) => {
    Order.find({}).sort('-created').exec((err, allorders) => {
        if(err) res.status(400).json(err);
        res.json(allorders);
    })
})

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