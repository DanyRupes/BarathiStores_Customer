const express = require('express');
const multer = require('multer');
const SubCategory = require('../../models/subcategory');
const validateSubCategoryInput = require('../../validation/subcategory');
const router = express.Router();
const passport = require('../../config/auth');

//Multer middleware for image upload
// Image upload middleware
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, './public/images/categories')},
    filename: (request, file, callback) => {
      callback(null, file.originalname);
  }});
  
  const upload = multer({ storage: storage });


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
//Edit category
router.get('/editsubcategory/:id', (req,res) => {
    
    SubCategory.findByIdAndUpdate(req.params.id, (err, subcategory) => {
        if(err) return res.status(400).json(err);
        res.json(subcategory);
    });
});

//List all sub categories 
router.get('/listsubcategory', (req,res) => {
    console.log('Im in list subcategory');
    console.log(req.user);
    if(req.isAuthenticated()){
    SubCategory.find({}, (err,subcategories) => {
        if(err) res.status(400).json(err);
        res.json(subcategories);
    });}
});

//List sub category based on category
router.get('/listsubcategoryoncategory/:id',(req,res) => {
    console.log("In subbbbbb",req.session.userId)

  
    //var productid = mongoose.Types.ObjectId('5c778e06234029258c188f20');
    console.log('Im in list subcategory');
    // console.log(req.session.id);
   
    SubCategory.find({categoryid : req.params.id}).populate('categoryid').exec((err,subcategory)=>{
        if(err) res.status(400).json(err);
        // console.log(subcategory);
        res.json(subcategory);

    });
})

//Delete Category
router.delete('/deletesubcategory/:id', (req,res) => {
    SubCategory.findByIdAndRemove(req.params.id, (err,subcategory) => {
        if(err) return res.status(400).json(err);
        res.json(subcategory);
    });
});

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    
}


module.exports = router;