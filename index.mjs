import express from "express";
const app = express();
const PORT = process.env.PORT || 9000;

import emojis from "./emojis.js";

function getRandomEmoji() {
  const index = Math.floor(Math.random() * emojis.length);
  return {
    emoji: emojis[index],
    length: emojis.length,
    index,
  };
}

app.get("/", (req, res) => {
  res.json({
    message: "Hello 👋",
    startupTime: process.uptime(),
    timestamp: Date.now(),
  });
});
app.get("/random", (req, res) => {
  res.json({
    ...getRandomEmoji(),
    timestamp: new Date(),
    random: Math.floor(Math.random() * 50000),
  });
});
app.get("/emoji", (req, res) => {
  res.json(getRandomEmoji());
});

app.get("/emoji/:index", (req, res) => {
  const { index } = req.params;
  const intIndex = parseInt(index);
  if (intIndex < emojis.length && intIndex >= 0) {
    return res.json({
      emoji: emojis[intIndex],
    });
  }

  res.status(400).json({
    message: `invalid emoji index. index must be less than or equal to ${
      emojis.length - 1
    } and greater than or equal to 0`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
