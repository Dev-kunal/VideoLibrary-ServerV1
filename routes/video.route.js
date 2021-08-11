const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model.js");
const Liked = require("../models/liked.model.js");
const mongoose = require("mongoose");

router.param("videoId", async (req, res, next, videoId) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      res
        .status(400)
        .json({ success: false, message: "Video not found in DB" });
    }
    req.video = video;
    next();
  } catch (err) {
    res.json(500).json({ success: false, message: err.message });
  }
});

router.get("/liked", async (req, res) => {
  try {
    let userId = req.user.userId;
    const likedVideos = await Liked.find({ userId: userId })
      .populate({ path: "videoId", ref: "Video" })
      .select("videoId");
    res.status(200).json({ success: true, likedVideos });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/:videoId", async (req, res) => {
  try {
    let { video } = req;
    let userId = req.user.userId;
    video.__v = undefined;
    const filter = {
      $and: [{ userId }, { videoId: video._id }],
    };
    const likeStatus = await Liked.findOne(filter);
    if (likeStatus) {
      res.status(200).json({ success: true, video: video, isLiked: true });
    } else {
      res.status(200).json({ success: true, video: video, isLiked: false });
    }
  } catch (err) {
    res.json({ sucess: false, message: err.message });
  }
});

router.post("/likeunlike", async (req, res) => {
  try {
    let { videoId } = req.body;
    const filter = {
      $and: [
        { userId: mongoose.Types.ObjectId(req.user.userId) },
        { videoId: mongoose.Types.ObjectId(videoId) },
      ],
    };
    const alreadyLiked = await Liked.findOne(filter);
    if (!alreadyLiked) {
      const newVideo = { userId: req.user.userId, videoId };
      const NewItem = new Liked(newVideo);
      const likedVideo = await NewItem.save();
      res.status(200).json({ success: true, liked: true });
    } else {
      const unlikedVideo = await Liked.findOneAndDelete(filter);
      res.status(200).json({ success: true, liked: false });
    }
  } catch (err) {
    res.json({ sucess: false, message: err.message });
  }
});

module.exports = router;
