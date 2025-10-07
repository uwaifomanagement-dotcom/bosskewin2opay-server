// Win2Opay Game Backend
// Author: Bosske x GPT Team
// This handles game spins, winners, and OPay payouts (demo mode)

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simulated player data
let players = {};

// Spin endpoint
app.post("/spin", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Missing username" });

  // random prize
  const prizes = [0, 10, 50, 100, 200];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];

  // Save to user
  if (!players[username]) players[username] = 0;
  players[username] += prize;

  res.json({
    message: `🎉 You won ₦${prize}!`,
    total: players[username],
  });
});

// OPay payout simulation
app.post("/payout", (req, res) => {
  const { username, opayNumber } = req.body;
  if (!username || !opayNumber)
    return res.status(400).json({ error: "Missing info" });

  const amount = players[username] || 0;
  players[username] = 0;

  res.json({
    message: `💸 ₦${amount} sent to OPay ${opayNumber} (demo mode)`,
  });
});

app.get("/", (req, res) => {
  res.send("✅ Win2Opay Backend is Live!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
