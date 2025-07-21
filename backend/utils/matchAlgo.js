function getTopMatches(user, others) {
  const preferences = [
    "cleanliness",
    "sleep",
    "food",
    "music",
    "study",
    "currentYear",
    "degree",
  ];

  const matches = others.map((other) => {
    let score = 0;
    preferences.forEach((key) => {
      if (
        user[key] !== undefined &&
        other[key] !== undefined &&
        user[key] === other[key]
      ) {
        score += 100 / preferences.length;
      }
    });

    return {
      ...other.toObject(),
      score: Math.round(score),
    };
  });

  matches.sort((a, b) => b.score - a.score);
  return matches;
}

module.exports = getTopMatches;
