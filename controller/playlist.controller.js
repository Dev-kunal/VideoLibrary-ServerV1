const Playlist = require("../models/playlist.model");
const mongoose = require("mongoose");

const getPlaylists = async (req, res) => {
  try {
    const { userId } = req.user;
    const playlists = await Playlist.find({ userId }).populate("videos");
    res.status(200).json({ success: true, playlists });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { playlistName } = req.body;
    const { userId } = req.user;
    const NewPlaylist = new Playlist({
      userId,
      playlistName,
    });
    const savedPlaylist = await NewPlaylist.save();
    res.status(201).json({ success: true, savedPlaylist: savedPlaylist });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

const addItemToPlaylist = async (req, res) => {
  try {
    const { playlistId, videoId } = req.body;
    const { userId } = req.user;
    const filter = {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
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
};

const removeItem = async (req, res) => {
  try {
    const { playlistId, videoId } = req.body;
    const { userId } = req.user;
    const filter = {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
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
};

const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.body;
    const { userId } = req.user;
    const filter = {
      $and: [{ userId }, { _id: playlistId }],
    };
    const deletedPlaylist = await Playlist.findOneAndDelete(filter);
    res.status(201).json({ success: true, deletedPlaylist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPlaylists,
  createPlaylist,
  addItemToPlaylist,
  removeItem,
  deletePlaylist,
};
