const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    First_Name : String,
    Last_Name : String,
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone_number : Number
});

module.exports = mongoose.model('customers', UserSchema)