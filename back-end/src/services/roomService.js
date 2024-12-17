const rooms = {};

// create room
const createRoomAPI = (roomId) => {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      board: Array(10)
        .fill(null)
        .map(() => Array(10).fill(null)),
    };
    return { success: true, message: "Room created successfully", roomId };
  }
  return { success: false, message: "Room already exists" };
};

// join room from api
const joinRoomAPI = (roomId) => {
  if (rooms[roomId]) {
    return { success: true, message: "Room joined successfully", roomId };
  }
  return { success: false, message: "Room does not exist" };
};

// create room from socket
const createRoom = (roomId, rooms, socket) => {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      board: Array(10)
        .fill(null)
        .map(() => Array(10).fill(null)),
    };
    socket.join(roomId);
    socket.emit("room-created", { roomId });
    console.log(`Room created: ${roomId}`);
  } else {
    socket.emit("room-exists", { roomId });
  }
};

// join room from socket
const joinRoom = (roomId, rooms, socket, io) => {
  if (rooms[roomId]) {
    socket.join(roomId);
    io.to(roomId).emit("player-joined", `Player ${socket.id} has joined`);
    console.log(`Room joined: ${roomId}`);
  } else {
    socket.emit("room-error", "Room does not exist");
  }
};

// update board from socket
const updateMove = (roomId, rooms, boardState, socket, io) => {
  if (rooms[roomId]) {
    rooms[roomId].board = boardState;
    io.to(roomId).emit("board-updated", boardState);
    console.log(`Board updated: ${roomId}`);
  } else {
    socket.emit("room-error", "Room does not exist");
    console.log(`Room does not exist: ${roomId}`);
  }
};

module.exports = {
  createRoomAPI,
  joinRoomAPI,
  createRoom,
  joinRoom,
  updateMove,
};
