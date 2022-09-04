const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    
  email: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  orderOn: {
    type: Date,
    default: Date.now(),
  },
  orderId:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"Placed"
  }
});

module.exports = mongoose.model("order", Order);
