const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    categoryid : {
        type : mongoose.Schema.ObjectId,
        ref : 'category'
    },
    subcategoryname : {
        type : String,
        required : 'Sub-category is required'
    },
    displayorder : {
        type : Number,
        required : 'Display order is required'
    },
    image : {
        data : Buffer,
        contentType : String
    },
    description : {
        type : String
    },
    hidesubcategory : {
        type : String,
        default : 'No'
    },
    updated : Date,
    created : {
        type : Date,
        default : Date.now
    }
});

module.exports = SubCategory = mongoose.model('subcategory', SubCategorySchema);