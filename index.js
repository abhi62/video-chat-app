const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const { Socket } = require("dgram");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("server is running");
});

io.on("Connection", (Socket) => {
  Socket.emit("me", Socket.id);

  Socket.on("disconnect", () => {
    Socket.broadcast.emit("callended");
  });
});

server.listen(PORT, () => console.log(`Server listning on port ${PORT}`));
