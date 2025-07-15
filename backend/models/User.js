const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  cleanliness: String,
  sleep: String,
  food: String,
  music: String,
  study: String,
});

module.exports = mongoose.model("User", userSchema);
