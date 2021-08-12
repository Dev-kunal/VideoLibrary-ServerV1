const express = require("express");
const { getVideoById } = require("../controller/params.controller.js");
const router = express.Router();

const {
  getLikedVideos,
  likeUnlikeVideo,
  getVideo,
} = require("../controller/video.controller.js");

router.param("videoId", getVideoById);
router.get("/liked", getLikedVideos);
router.get("/:videoId", getVideo);
router.post("/likeunlike", likeUnlikeVideo);

module.exports = router;
