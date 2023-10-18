const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const Video = require("./models/video.model");

const app = express();
app.use(cors());
app.use(express.json());
const { initializeDBConnection } = require("./db/db.connect");
initializeDBConnection();

const videoRouter = require("./routes/video.route.js");
const userRouter = require("./routes/user.route.js");
const playlistRouter = require("./routes/playlist.route.js");
const authVerify = require("./middleware/authVerify");
const routeHandler = require("./middleware/routeHandler");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/user", userRouter);
app.use("/videos", authVerify, videoRouter);
app.use("/playlist", authVerify, playlistRouter);

app.get("/", (req, res) => {
  res.json({ message: "Tech Tube Server" });
});

app.get("/data", async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ success: true, videos: videos });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.use(routeHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started");
});
