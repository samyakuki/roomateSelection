const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middleware/auth");
const getTopMatches = require("../utils/matchAlgo");

router.post("/form", authenticate, async (req, res) => {
  if (req.body.email !== req.userEmail)
    return res.status(403).json({ message: "Email mismatch" });

  const updated = await User.findOneAndUpdate(
    { email: req.userEmail },
    {
      gender: req.body.gender,
      cleanliness: req.body.cleanliness,
      sleep: req.body.sleep,
      food: req.body.food,
      music: req.body.music,
      study: req.body.study,
      currentYear: req.body.currentYear,
      degree: req.body.degree,
    },
    { new: true }
  );

  const all = await User.find({
    gender: updated.gender,
    degree: updated.degree,
    currentYear: updated.currentYear,
    _id: { $ne: updated._id },
    cleanliness: { $exists: true },
  });

  // ✅ Fix: Await the async getTopMatches
  const matches = await getTopMatches(updated, all);

  // ✅ Defensive check
  if (!Array.isArray(matches)) {
    return res.status(500).json({ message: "Matching failed" });
  }

  // Store match history
  updated.matchHistory.unshift({
    matches: matches.map((m) => m._id),
    timestamp: new Date(),
  });
  await updated.save();

  res.json({ matches });
});

// Route to fetch full match history
router.get("/history/:email", authenticate, async (req, res) => {
  if (req.params.email !== req.userEmail)
    return res.status(403).json({ message: "Unauthorized access" });

  const user = await User.findOne({ email: req.params.email })
    .populate("matchHistory.matches", "name email gender cleanliness sleep food music study degree currentYear")
    .exec();

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.json({ history: user.matchHistory });
});


router.get("/results/:email", authenticate, async (req, res) => {
  if (req.params.email !== req.userEmail)
    return res.status(403).json({ message: "Unauthorized access" });

  const user = await User.findOne({ email: req.params.email })
    .populate("matchHistory.matches", "name email gender cleanliness sleep food music study") // return match user info
    .exec();

  if (!user || !user.matchHistory.length)
    return res.status(404).json({ message: "No match history found" });

  const latest = user.matchHistory[0];
  res.json({ matches: latest.matches, timestamp: latest.timestamp });
});


module.exports = router;
