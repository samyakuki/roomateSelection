const axios = require('axios');

/**
 * Fetches ML-based match score from Flask API for two users
 */
async function fetchMatchScore(user, other) {
  try {
    const res = await axios.post('http://localhost:5001/predict', {
      cleanliness: other.cleanliness,
      sleep: other.sleep,
      food: other.food,
      music: other.music,
      study: other.study,
      same_gender: user.gender === other.gender ? 1 : 0,
      same_degree: user.degree === other.degree ? 1 : 0,
      same_year: user.currentYear === other.currentYear ? 1 : 0,
    });

    return res.data.match_score || 0;
  } catch (err) {
    console.error('ML model error:', err.message);
    return 0;
  }
}

/**
 * Main function to get top matches using ML
 */
async function getTopMatches(user, others) {
  // 💡 Step 1: Pre-filter users to reduce load
  const filtered = others.filter((o) =>
    o.gender === user.gender &&
    o.degree === user.degree &&
    o.currentYear === user.currentYear
  );

  // 💡 Step 2: Limit to top 50 candidates
  const limited = filtered.slice(0, 50);

  const matches = [];

  // 💡 Step 3: Call Flask ML model for each match
  for (const other of limited) {
    const score = await fetchMatchScore(user, other);
    matches.push({ ...other.toObject(), score });
  }

  // 💡 Step 4: Sort and return
  matches.sort((a, b) => b.score - a.score);
  return matches;
}

module.exports = getTopMatches;
