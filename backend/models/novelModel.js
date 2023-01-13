const {model, Schema, Types} = require('../connection');

const userSchema = new Schema({
    title : String,
    author : String,
    genre : String,
    publisher : String,
    user : {type: Types.ObjectId, ref : 'users'},
    rentable : Boolean,
    sellable : Boolean,
    rentPrice : Number,
    sellPrice : Number,
    image : String,
    createAt : Date
})

module.exports =  model('novels', userSchema);