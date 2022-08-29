const mongoose=require("mongoose")

const CatSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    addOn:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("category",CatSchema);