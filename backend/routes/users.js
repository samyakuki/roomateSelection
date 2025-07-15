const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getTopMatches } = require("../utils/matchAlgo");

// Add a user and return top 3 matches
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();

  const allUsers = await User.find({ gender: newUser.gender, _id: { $ne: newUser._id } });
  const topMatches = getTopMatches(newUser, allUsers);
  res.json(topMatches);
});

// Add default users (call once)
router.get("/seed", async (req, res) => {
  const defaults = [
  { name: "Alex", gender: "male", cleanliness: "neat", sleep: "early", food: "veg", music: "pop", study: "group" },
  { name: "Maya", gender: "female", cleanliness: "average", sleep: "night", food: "nonveg", music: "rock", study: "alone" },
  { name: "Ravi", gender: "male", cleanliness: "messy", sleep: "night", food: "nonveg", music: "pop", study: "group" },
  { name: "Sneha", gender: "female", cleanliness: "neat", sleep: "early", food: "veg", music: "pop", study: "group" },
  { name: "Priya", gender: "female", cleanliness: "messy", sleep: "night", food: "nonveg", music: "rock", study: "alone" }
];
;

  await User.insertMany(defaults);
  res.send("Default users added!");
});

module.exports = router;
