const mongoose = require("mongoose");

const initializeDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongoose connected successfully");
  } catch (err) {
    console.error("mongoose connection failed...", err);
  }
};

module.exports = { initializeDBConnection };
