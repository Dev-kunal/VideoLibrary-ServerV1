const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const initializeDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongoose connected successfully");
  } catch (err) {
    console.error("mongoose connection failed...", err);
  }
};

module.exports = { initializeDBConnection };
