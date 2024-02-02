const io = require("socket.io")(3001, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection",(socket)=>{
  console.log("user connected")
  socket.on("message",(message,roomName,sender,date,avatar)=>{
    console.log(message,roomName,sender,date,avatar)
    if(roomName.length){
      io.to(roomName).emit("message",message,sender,date,avatar)
    }else{
      io.emit("message",message)
    }
  })

  socket.on("joinRoom",(roomName)=>{
    console.log(roomName)
    socket.join(roomName)
  })

  socket.on("disconnect",()=>{
    console.log("user gone")
  })
})