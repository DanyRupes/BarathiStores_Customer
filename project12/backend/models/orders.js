const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartItem = require('./cartitems').schema;

const OrderSchema = new Schema({
     orders : [cartItem],
     totalamount: Number,
     customer_id : {
          type : mongoose.Schema.ObjectId,
          ref : 'users'
     },
     payment_id : {
          type : String
     },
     
     updated : Date,
     created : {
          type : Date,
          default : Date.now
     }
     
});

module.exports = Order = mongoose.model('orders', OrderSchema);