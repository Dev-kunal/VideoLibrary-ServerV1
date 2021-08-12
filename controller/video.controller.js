const Liked = require("../models/liked.model");
const mongoose = require("mongoose");

const getVideo = async (req, res) => {
  try {
    const { video } = req;
    const { userId } = req.user;
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
};

const getLikedVideos = async (req, res) => {
  try {
    const { userId } = req.user;
    const likedVideos = await Liked.find({ userId })
      .populate({ path: "videoId", ref: "Video" })
      .select("videoId");
    res.status(200).json({ success: true, likedVideos });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const likeUnlikeVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    const { userId } = req.user;
    const filter = {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
        { videoId: mongoose.Types.ObjectId(videoId) },
      ],
    };
    const alreadyLiked = await Liked.findOne(filter);
    if (!alreadyLiked) {
      const newVideo = { userId, videoId };
      const NewItem = new Liked(newVideo);
      const likedVideo = await NewItem.save();
      res.status(201).json({ success: true, liked: true });
    } else {
      const unlikedVideo = await Liked.findOneAndDelete(filter);
      res.status(201).json({ success: true, liked: false });
    }
  } catch (err) {
    res.json({ sucess: false, message: err.message });
  }
};

module.exports = { getLikedVideos, likeUnlikeVideo, getVideo };
