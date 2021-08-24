const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = mongoose.Schema({
    id:String,
    name:String,
    email:String,
    password:String,
    address:String,

})
module.exports = mongoose.model('user',userSchema,'users')