const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
    cashondelivery : {
        type : String,
        default : "ON"
    },
    cardondelivery : {
        type : String,
        default : "ON"
    },
    onlinepayment : {
        type : String,
        default : "ON"
    },
    gstbilling : {
        type : String,
        default : "YES"
    },
    minimumorderamount : {
        type : Number,
        default : 0
    },
    deliverycharge : {
        type : Number,
        default : 0
    }
})

module.exports = Preference = mongoose.model('preferences', PreferenceSchema);