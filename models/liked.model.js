const mongoose=require("mongoose");

const LikedSchema=new mongoose.Schema({
  userId:{type:mongoose.Types.ObjectId,ref:"User"},
  videoId:{type:mongoose.Types.ObjectId,ref:"Video"}
},{
  timestamps:true
})

const Liked=new mongoose.model("Liked",LikedSchema)
module.exports=Liked;