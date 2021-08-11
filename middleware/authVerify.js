const jwt = require("jsonwebtoken");

const authVerify = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    // console.log("token from authMiddleware ===>", token);
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Unauthorised access, please add the token" });
  }
};

module.exports = authVerify;
