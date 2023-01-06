const {model, Schema} = require('../connection');

const userSchema = new Schema({
    username : String,
    email : String,
    age : Number,
    isAdmin: {type: Boolean, default: false},
    password : String
})

module.exports =  model('users', userSchema);