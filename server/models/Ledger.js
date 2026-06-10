const mongoose = require("mongoose");


const ledgerSchema = new mongoose.Schema({

 saleId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Sale"
 },

 amount:{
  type:Number,
  required:true
 },

 type:{
  type:String,
  default:"SALE"
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

});


module.exports =
mongoose.model(
"Ledger",
ledgerSchema
);