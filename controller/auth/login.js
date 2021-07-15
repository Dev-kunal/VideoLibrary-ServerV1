const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      res.json({ success: false, message: "User does not exist" });
      return;
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      res.json({ success: false, message: "Incorrect Password" });
      return;
    }
    user = await user.save();
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
    user.password = undefined;
    user.email = undefined;
    user.fullname = undefined;
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = login;
