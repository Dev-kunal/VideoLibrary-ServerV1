const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model.js");
const Liked = require("../models/liked.model.js")
const mongoose=require("mongoose");


router.param("videoId", async (req, res, next, videoId) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      res.status(400).json({ success: false, message: "Video not found in DB" })
    }
    req.video = video;
    next();
  } catch (err) {
    res.json(400).json({ success: false, message: err.message })
  }

})
 router.route("/liked")
  .get(async (req, res) => {
    try {
      let userId=req.headers.userid;
      const likedVideos = await Liked.find({userId:userId}).populate({path:'videoId',ref:"Video"}).select('videoId')
      res.status(200).json({ success: true, likedVideos });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message })
    }
  });

router.route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});
      res.status(200).json({ success: true, videos: videos })
    } catch (err) {
      res.status(400).json({ success: false, message: err.message })
    }
  })


router.route("/:videoId")
  .get(async (req, res) => {
    try{
    let { video } = req;
    let userId=req.headers.userId;
    video.__v = undefined;
     const filter = {
        $and: [{ userId },{ videoId: video._id }]
      }
    const likeStatus = await Liked.findOne(filter);
      if(likeStatus){
      res.json({ success: true, video: video,isLiked:true });
      }else{
      res.json({ success: true, video: video,isLiked:false });
      }
    }catch(err){
      res.json({ sucess: false, message: err.message })
    }
  })


router.route("/likeunlike")
  .post(async (req, res) => {
    try {
      let { userId, videoId } = req.body;
       const filter = {
        $and: [{ userId:mongoose.Types.ObjectId(userId) },{ videoId: mongoose.Types.ObjectId(videoId) }]
      }
      const alreadyLiked = await Liked.findOne(filter)
      if (!alreadyLiked) {
        const newVideo = { userId, videoId };
        const NewItem = new Liked(newVideo);
        const likedVideo = await NewItem.save();
        res.json({ success: true, liked:true })
      }
      else {
        const unlikedVideo=await Liked.findOneAndDelete(filter)
        res.json({ success: true, liked:false })
      }
    } catch (err) {
      res.json({ sucess: false, message: err.message })
    }
  })
 




module.exports = router;