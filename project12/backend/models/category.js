const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryname : {
        type : String,
        required : true
    },
    displayorder : {
        type : Number,
        required : true
    },
    image : {
        type : String
    },
    description  : {
        type : String,
        required : true
    },
    hidecategory : {  
        type : String,
        default : "NO"
    },
    updated: Date,
    created : {
        type : Date,
        default: Date.now

    }
});

module.exports = Category = mongoose.model('category', CategorySchema);