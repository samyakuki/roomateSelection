function getTopMatches(newUser, allUsers) {
  const scoreUser = (user) => {
    let score = 0;
    if (user.cleanliness === newUser.cleanliness) score++;
    if (user.sleep === newUser.sleep) score++;
    if (user.food === newUser.food) score++;
    if (user.music === newUser.music) score++;
    if (user.study === newUser.study) score++;
    return score;
  };

  const scored = allUsers.map((u) => ({ ...u._doc, score: scoreUser(u) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}

module.exports = { getTopMatches };
