const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const roomRoutes = require("./routes/roomRoutes");
const roomService = require("./services/roomService");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware để parse JSON
app.use(express.json());

// import routes
app.use("/api/rooms", roomRoutes);

// state room
const rooms = {};

// Sự kiện kết nối Socket.IO
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Tạo room
  socket.on("create-room", (roomId) => {
    roomService.createRoom(roomId, rooms, socket);
  });

  // Tham gia room
  socket.on("join-room", (roomId) => {
    roomService.joinRoom(roomId, rooms, socket, io);
  });

  // Cập nhật bàn cờ
  socket.on("play-move", ({ roomId, boardState }) => {
    roomService.updateMove(roomId, rooms, boardState, socket, io);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Khởi chạy server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
