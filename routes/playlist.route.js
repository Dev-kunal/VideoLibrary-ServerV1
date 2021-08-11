const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist.model.js");
const mongoose = require("mongoose");

router.param("playlistId", async (req, res, next, playlistId) => {
  try {
    let userId = req.user.userId;
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
    res.status(500).json({ success: false, message: err.message });
  }
});

router
  .get("/", async (req, res) => {
    try {
      let userId = req.user.userId;
      const playlists = await Playlist.find({ userId }).populate("videos");
      res.status(200).json({ success: true, playlists });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  })
  .post("/", async (req, res) => {
    try {
      let { playlistName } = req.body;
      const NewPlaylist = new Playlist({
        userId: req.user.userId,
        playlistName,
      });
      const savedPlaylist = await NewPlaylist.save();
      res.status(201).json({ success: true, savedPlaylist: savedPlaylist });
    } catch (err) {
      res.status(500).json({ sucess: false, message: err.message });
    }
  });

router.post("/additem", async (req, res) => {
  try {
    let { playlistId, videoId } = req.body;
    const filter = {
      $and: [
        { userId: mongoose.Types.ObjectId(req.user.userId) },
        { _id: mongoose.Types.ObjectId(playlistId) },
      ],
    };
    const response = await Playlist.findOne(filter);
    response.videos.push(videoId);
    const savedPlaylist = await response.save();
    res.status(201).json({ success: true, savedPlaylist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/removeitem", async (req, res) => {
  try {
    let { playlistId, videoId } = req.body;
    const filter = {
      $and: [
        { userId: mongoose.Types.ObjectId(req.user.userId) },
        { _id: mongoose.Types.ObjectId(playlistId) },
      ],
    };
    const response = await Playlist.findOne(filter);
    const deleted = response.videos.splice(response.videos.indexOf(videoId), 1);
    const savedPlaylist = await response.save();
    res.status(201).json({ success: true, savedPlaylist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/delete", async (req, res) => {
  try {
    let { playlistId } = req.body;
    const filter = {
      $and: [{ userId: req.user.userId }, { _id: playlistId }],
    };
    const deletedPlaylist = await Playlist.findOneAndDelete(filter);
    res.status(201).json({ success: true, deletedPlaylist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.route("/:playlistId").get(async (req, res) => {
  let { playlist } = req;
  res.status(200).json({ sucess: true, playlist: playlist });
});

module.exports = router;
