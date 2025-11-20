import { Server } from "socket.io";

const io = new Server(8000,{
    cors:true
});

io.on("connection", (socket) => {
//   console.log(`socket connected @ ${socket.id}`);
  const emailToSocketMap = new Map()
  const socketToEmailMap =  new Map();

  socket.on('room:join',(data)=>{
    const {email,room} = data
   emailToSocketMap.set(email,socket.id)
   socketToEmailMap.set(socket.id,email)

   io.to(room).emit('user:joined',{email,id:socket.id})
   socket.join(room)

   io.to(socket.id).emit('room:join',data)
  })

  socket.on('user:call',({to,offer})=>{
    io.to(to).emit('incomming:call',{from:socket.id,offer})
  })
  socket.on('call:accepted',({to,ans})=>{
    io.to(to).emit('call:accepted',{from:socket.id,ans})
  })

  socket.on('perr:nego:needed',({to,offer})=>{
    io.to(to).emit('perr:nego:needed',{from:socket.id,offer})
  })

   socket.on('perr:nego:done',({to,ans})=>{
    io.to(to).emit('perr:nego:final',{from:socket.id,ans})
  })
});
