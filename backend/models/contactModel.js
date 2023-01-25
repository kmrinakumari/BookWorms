const {model, Schema, Types} = require('../connection');

const userSchema = new Schema({
    name : String,
    email : String,
    subject : String,
    message : String,
    user : {type: Types.ObjectId, ref : 'users'},
    createAt : Date
})

module.exports =  model('contact', userSchema);