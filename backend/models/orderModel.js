const {model, Schema, Types} = require('../connection');

const orderSchema = new Schema({
    user : {type: Types.ObjectId, ref : 'users'},
    novel : {type: Types.ObjectId, ref : 'novels'},
    type : String,
    createdAt : Date
})

module.exports =  model('orders', orderSchema);