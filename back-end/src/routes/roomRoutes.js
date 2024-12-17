const express = require("express");
const router = express.Router();
const roomService = require("../services/roomService");

// api create room
router.post("/create-room", (req, res) => {
  const { roomId } = req.body;
  const result = roomService.createRoomAPI(roomId);
  res.json(result);
});

// api join room
router.post("/join-room", (req, res) => {
  const { roomId } = req.body;
  const result = roomService.joinRoomAPI(roomId);
  res.json(result);
});

module.exports = router;
