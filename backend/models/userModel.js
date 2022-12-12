const {model, Schema} = require('../connection');

const userSchema = new Schema({
    username : String,
    email : String,
    age : Number,
    password : String
})

module.exports =  model('users', userSchema);