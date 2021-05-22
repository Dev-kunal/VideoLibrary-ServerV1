const mongoose=require("mongoose");

const PlaylistSchema=new mongoose.Schema({
  userId:{type:mongoose.Types.ObjectId,ref:"User"},
  playlistName:String,
  videos:[{type:mongoose.Types.ObjectId,ref:"Video"}]
},{
  timestamps:true
})

const Playlist=new mongoose.model("Playlist",PlaylistSchema)
module.exports=Playlist;