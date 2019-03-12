const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    products :[{
        product:{
            type : mongoose.Schema.ObjectId,
            ref  : 'products'
        },
        quantity : String
    }]
    
});
module.exports = cartItem = mongoose.model('cartitems', cartItemSchema);