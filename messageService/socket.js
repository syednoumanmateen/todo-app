const { Server } = require("socket.io")
const http = require("http")
const express = require("express")

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: [process.env.IOURL],
    methods: ["GET", "POST"]
  }
})

const getReceiverSocketId = receiverId => {
  return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on("connection", socket => {
  console.log(`A user connected at ${socket.id}`)

  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId] = socket.id

  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log(`A user disConnected at ${socket.id}`)
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

module.exports = {
  app, io, server, getReceiverSocketId
}