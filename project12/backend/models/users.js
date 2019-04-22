const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
//     cart :{
//     items :[{
//         productid:{
//             type : mongoose.Schema.ObjectId,
//             ref  : 'products'
//         },
//         productname : String,
//         sellingprice : Number,
//         quantity : String,
//         amount : Number

//     }],
//     totalamount : Number
// },
    orders:[{
        o_products :[],
        totalamount: Number,
        payment_id : {
            type : String
       },
       updated : Date,
       created : {
            type : Date,
            default : Date.now
       }
    }
    ],
    role : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    facebook : String,
    google: String,
    tokens : Array,
    mobilenumber: {
        type: String,
        required: true
    },
    email : {
        type : String,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
        type : String,
        
    },
    landmark : {
        type : String,
        
    },
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
      },

    updated : Date,
    date : {
        type : Date,
        default : Date.now
    },
});


UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      mobilenumber: this.mobilenumber,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  }
  
  UserSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
    };
  };
  
  

module.exports = User = mongoose.model("users", UserSchema);