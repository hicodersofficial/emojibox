import express from "express";
const app = express();
app.enable("trust proxy");

const PORT = process.env.PORT || 9000;

import emojis from "./emojis.js";
const logger = console;

function getRandomEmoji() {
  const index = Math.floor(Math.random() * emojis.length);
  return {
    emoji: emojis[index],
    length: emojis.length,
    index,
  };
}
app.use((req, res, next) => {
  const startTime = new Date();
  req.on("end", async () => {
    const endTime = new Date();
    logger.info(
      `${new Date().toISOString()} GET[${res.statusCode}] [${
        endTime - startTime
      }ms] [${req.ip}] ${req.url}`
    );
  });
  next();
});

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
