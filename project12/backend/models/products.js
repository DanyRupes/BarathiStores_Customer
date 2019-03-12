const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const searchable = require('mongoose-searchable');

const ProductSchema = new Schema({
    subcategoryid : {
        type : mongoose.Schema.ObjectId,
        ref : 'subcategory'
    },
    productname : {
        type :String,
        required : true,
    },
    displayorder : {
        type : Number,
        required : true
    },
    searchkey : {
        type : String,
    },
    originalprice : {
        type : String,
        required : true
    },
    sellingprice : {
        type : String,
        required : true
    },
    purchaseprice : {
        type : String,
        required : true
    },
    displayoffer : {
        type : String
    },
    hsncode : {
        type : String,
        required : true
    },
    gstpercent : {
        type : Number,
        
    },
    popularproduct : {
        type : String,
    },
    popularorder : {
        type : Number
    },
    offerproduct : {
        type : String
    },
    offerorder : {
        type : Number
    },
    hideproduct : {
        type : String,
        default : 'No'
    },
    availability : {
        type : String
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type: String
    }
});
//make all string field searchable
ProductSchema.plugin(searchable);

module.exports = Product = mongoose.model('products', ProductSchema);