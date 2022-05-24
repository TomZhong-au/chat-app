const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", socket => {
  io.emit("chat message", {
    sender: "server",
    content: "a new user has joined",
  })

  socket.on("chat message", msg => {
    io.emit("chat message", msg)
  })
  socket.on("disconnect", () => {
    io.emit("chat message", "a user has left the conversation")
  })
})

server.listen(3000, () => {
  console.log("listen on *:3000")
})
