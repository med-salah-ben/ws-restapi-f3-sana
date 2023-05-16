const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const contactSchema = new Schema({
    name:{type:String ,required:true},
    email:{type:String , required:true , unique:true},
    phone:String
})

const Contact = model("Contacts",contactSchema)

module.exports = Contact
