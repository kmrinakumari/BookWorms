const {model, Schema} = require('../connection');

const userSchema = new Schema({
    title : String,
    author : String,
    genre : String,
    publisher : String,
    user : String,
    rentable : Boolean,
    sellable : Boolean,
    rentPrice : Number,
    sellPrice : Number,
    image : String,
    createAt : Date
})

module.exports =  model('novels', userSchema);