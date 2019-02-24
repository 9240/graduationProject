const mongoose = require('./db.js');
const usermsgSchema = mongoose.Schema({
    username:String,
    password:String
})
const usermsgModel = mongoose.model('User',usermsgSchema,'user');
module.exports = usermsgModel;