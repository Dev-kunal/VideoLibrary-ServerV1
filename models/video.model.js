const mongoose=require("mongoose");

const VideoSchema=new mongoose.Schema(
  {
    name: {
      type:String,
      required:"Video must have a Name"
      },
    thumbnail:
     {
       type:String,
      required:"Video must have a Thumbnail"
    },
    url:
     {
       type:String,
      required:"Video must have a Url"
    },
    views: 
    {
      type:String,
      required:"Video must have a number of views"
    },
    videoLength:
     {
       type:String,
      required:"Video must have a TimeStamp"
    },
  },
  {
    timestamps:true
  }
)

const Video=mongoose.model("Video",VideoSchema);
module.exports={Video};