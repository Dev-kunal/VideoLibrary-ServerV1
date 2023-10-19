const Video = require("../models/video.model");
const Playlist = require("../models/playlist.model");
const mongoose = require("mongoose");

const getVideoById = async (req, res, next, videoId) => {
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
};

const getPlaylistById = async (req, res, next, playlistId) => {
  try {
    const { userId } = req.user;
    const filter = {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
        { _id: mongoose.Types.ObjectId(playlistId) },
      ],
    };
    const playlist = await Playlist.findOne(filter).populate("videos");
    req.playlist = playlist;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = { getVideoById, getPlaylistById };
