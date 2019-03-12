const express = require('express');
const multer = require('multer');
const Product = require('../../models/products');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('../../config');


//Multer middleware for image upload
// Image upload middleware
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, './public/images')},
    filename: (request, file, callback) => {
      callback(null, file.originalname);
  }});
  
  const upload = multer({ storage: storage });



//Add new Product
router.post('/addproduct',upload.any(), (req,res) => {

    var path = "public\\vcm_s_kf_m160_160x90.jpg";
   
    const newProduct = new Product({
        subcategory : req.body.subcategory,
        productname : req.body.productname,
        displayorder : req.body.displayorder,
        searchkey : req.body.searchkey,
        originalprice : req.body.originalprice,
        sellingprice : req.body.sellingprice,
        purchaseprice : req.body.purchaseprice,
        displayoffer : req.body.displayoffer,
        hsncode : req.body.hsncode,
        gstpercent : req.body.gstpercent,
        popularproduct : req.body.popularproduct,
        popularorder : req.body.popularorder,
        offerproduct : req.body.offerproduct,
        offerorder : req.body.offerorder,
        hideproduct : req.body.hideproduct,
        availability : req.body.availability,
        description : req.body.description,
        image : path
    });
    if(req.body._id === ''){
        Product.findOne({productname}).then(products => {
            if(products)
                return res.status(400).json("Product already exists");
            else{
            newProduct
            .save()
            .then(product => res.json(product))
            .catch(err => console.log(err));
            }
        })
    
    }
    //Update product
    else{
        var path = req.files[0].path;
        var imageName = req.files[0].originalname;
        var imagepath = {};

            imagepath['path'] = path;
            imagepath['originalname'] = imageName;
            req.body.image = path;
        Product.findByIdAndUpdate(req.body._id, req.body, (err, product) => {
            if( err ) return res.status(400).json(err);
            res.json(product);
        } );
    }
});

//Edit product
router.get('/editproduct/:id', (req,res) => {

    
    Product.findById(req.params.id, (err,product) => {
        if(err)
            return res.status(400).json(err);
        res.json(product);
    });
});

//List all Products
router.get('/listproducts', (req, res) => {
    Product.find((err, products) => {
        if(err)
         return res.status(400).json(err);
        res.json(products);
    })
});

//Search product

router.get('/searchproduct', (req,res) => {
    // Autocomplete configuration
// var configuration = {
//     //Fields being autocompleted, they will be concatenated
//     autoCompleteFields : [ "productname"],
//     //Returned data with autocompleted results
//     dataFields: ["_id"],
//     //Maximum number of results to return with an autocomplete request
//     maximumResults: 10,
//     //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
//     model: Product
// }
// //initialization of AutoComplete Module
// var myMembersAutoComplete = new AutoComplete(configuration, function(){
//     //any calls required after the initialization
//     console.log("Loaded " + myMembersAutoComplete.getCacheSize() + " words in auto complete");
//   });
  
//   //Finding in the autocomplete
//   //
//   // Lets say we have in mongodb a document -> { firstName : "James", lastName: "Green", _id: "535f06a28ddfa3880f000003"}
//   // getResults will return words -> [{"word": "James Green","data": ["535f06a28ddfa3880f000003"]}]
//   //
//   myMembersAutoComplete.getResults(req.body.productname, function(err, words){
//     if(err)
//       res.json(err);
//     else
//       res.json(words);
//   });
     
    let search = req.body.search;
    console.log(typeof(search));
    Product.find({'productname' : new RegExp(req.body.search, 'i')}, (err, product) => {
        if(err) return res.status(400).json(err);
        
        res.json(product);
    })
})

//List single product
router.get('/listproduct/:id', (req,res) =>{
    Product.findById(req.params.id, (err, product) => {
        if(err) return next(err);
        res.json(product);
    })
})

//List product based on subcategory
router.get('/listproductonsubcategory/:id', (req,res) => {
    //var productid = mongoose.Types.ObjectId('5c778e06234029258c188f20');
    console.log("Im in product");
    console.log(req.user);
    console.log(req.session.userId);
    console.log("Product received this - "+req.params.id);
    
    Product.find({subcategoryid : req.params.id}).populate('subcategoryid').exec((err,products)=>{
        if(err) res.status(400).json(err);
        res.json(products);
    });
})

//Delete Product
router.delete('/deleteproduct/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, req.body, (err, product) => {
        if(err) return res.status(400).json(err);
        res.json(product);
    });
});

module.exports=router;