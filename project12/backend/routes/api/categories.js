const express = require('express');
const multer = require('multer');
const Category = require('../../models/category');
const validateCategoryInput = require('../../validation/category');
const router = express.Router();
const passport = require('../../config');
const SubCategory = require('../../models/subcategory');

//Multer middleware for image upload
// Image upload middleware
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, './public/images/categories')},
    filename: (request, file, callback) => {
      callback(null, file.originalname);
  }});
  
  const upload = multer({ storage: storage });


//Add new category
router.post('/addcategory',upload.any(), (req,res) => {
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
                return res.status(400).json({ categoryname : "Category already exists"});
            }
    newCategory.save()
    .then(category => res.json(category))
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
        Category.findByIdAndUpdate(req.body._id, req.body, (err,category) => {
            if(err) return res.status(400).json(err);
            res.json(category);
        });
    }
});
//Edit category
router.get('/editcategory/:id', (req,res) => {
    
    Category.findByIdAndUpdate(req.params.id, (err, category) => {
        if(err) return res.status(400).json(err);
        res.json(category);
    });
});

//List all category
router.get('/listcategory', (req,res) => {
    console.log("I received Category request");
    console.log("res.locals.user in category");
    console.log(req.session,"----------------------")
   
   
    Category.find({}, (err,categories) => {
        if(err) res.status(400).json(err);
        res.json(categories);
    });
});

router.get('/omg',(req,res) => {
    console.log(req.session,"----------------------")
    res.send("ohhhh")
})
router.get('/listsubcategoryoncategory/:id',(req,res) => {
    console.log(req.session,"----------------------")
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
router.delete('/deletecategory/:id', (req,res) => {
    Category.findByIdAndRemove(req.params.id, (err,category) => {
        if(err) return res.status(400).json(err);
        res.json(category);
    });
});

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    
}

module.exports = router;