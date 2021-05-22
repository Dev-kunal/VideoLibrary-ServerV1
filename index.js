const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Video } = require("./models/video.model.js");

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const { initializeDBConnection } = require("./db/db.connect");
initializeDBConnection();

const videoRouter = require("./routes/video.route.js");
const userRouter = require("./routes/user.route.js");
const playlistRouter = require("./routes/playlist.route.js");

app.use("/videos", videoRouter);
app.use("/user", userRouter);
app.use("/playlist", playlistRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// route 404
app.get((req, res) => {
  res.json({ message: "Route not Found" });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
