const express = require("express");
const router = express.Router();
const Playlist = require("../models/playlist.model.js");
const mongoose = require("mongoose");
const {
  getPlaylists,
  createPlaylist,
  addItemToPlaylist,
  removeItem,
  deletePlaylist,
} = require("../controller/playlist.controller.js");
const { getPlaylistById } = require("../controller/params.controller.js");

router.param("playlistId", getPlaylistById);
router.get("/", getPlaylists);
router.post("/", createPlaylist);
router.post("/additem", addItemToPlaylist);
router.post("/removeitem", removeItem);
router.post("/delete", deletePlaylist);

router.get("/:playlistId", async (req, res) => {
  let { playlist } = req;
  res.status(200).json({ sucess: true, playlist });
});

module.exports = router;
