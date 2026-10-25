const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
    }, lastName: {
        type: String,
    }
    , emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }, password: {
        type: String,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!(["male","female","other"].includes(value))){
                throw new Error("gender should be male, female or other")
            }   

        }
    },
    photoUrl:{
        type: String,
        default: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
    },
    about:{
        type: String,
        default: "Hey there! I am using DevTinder"
    },
    skills:{
        type: [String],
    },
    
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);;