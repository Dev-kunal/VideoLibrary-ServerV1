const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

const signup = async (req, res) => {
  let { email, username, fullname, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        success: false,
        message: "A user is already registered with this Email",
      });
      return;
    }
    user = await User.findOne({ username });
    if (user) {
      res
        .status(409)
        .json({ success: false, message: "Username is already taken" });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newUser = {
      email,
      username,
      fullname,
      password: hash,
    };
    const NewUser = await User.create(newUser);
    // console.log(NewUser);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully..!" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = signup;
