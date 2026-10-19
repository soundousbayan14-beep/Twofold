const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: false }, maxHttpBufferSize: 1e5 });
const rooms = new Map();
const makeCode = () => { const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let code; do { code=Array.from({length:5},()=>chars[crypto.randomInt(chars.length)]).join(''); } while(rooms.has(code)); return code; };
app.get('/health', (_req,res)=>res.json({ok:true,rooms:rooms.size}));
app.get('/', (_req,res)=>res.sendFile(path.join(__dirname,'index.html')));
app.get('/blocky-character.gltf', (_req,res)=>res.sendFile(path.join(__dirname,'blocky-character.gltf')));
io.on('connection', socket => {
  socket.on('host-room', payload => {
    if (socket.data.room) return;
    const code=makeCode(); const room={hostId:socket.id, players:new Map()};
    room.players.set(socket.id,{state:payload?.state||{}}); rooms.set(code,room);
    socket.data.room=code; socket.data.role='host'; socket.join(code); socket.emit('room-created',{code});
  });
  socket.on('join-room', payload => {
    const code=String(payload?.code||'').trim().toUpperCase(); const room=rooms.get(code);
    if (!room) { socket.emit('room-error',{message:'Room not found. Check the code and try again.'}); return; }
    if (room.players.size>=8) { socket.emit('room-error',{message:'That room is full (8 players maximum).'}); return; }
    if (socket.data.room) leaveRoom(socket);
    room.players.set(socket.id,{state:payload?.state||{}}); socket.data.room=code; socket.data.role='guest'; socket.join(code);
    socket.emit('room-joined',{code,players:[...room.players].map(([id,p])=>({id,state:p.state}))});
    socket.to(code).emit('player-state',{id:socket.id,state:payload?.state||{}});
  });
  socket.on('player-state', state => {
    const code=socket.data.room, room=rooms.get(code); if(!room||!room.players.has(socket.id)||!state||typeof state!=='object')return;
    room.players.get(socket.id).state=state;
    socket.to(code).emit('player-state',{id:socket.id,state});
  });
  socket.on('disconnect',()=>leaveRoom(socket));
});
function leaveRoom(socket){
  const code=socket.data.room,room=rooms.get(code); if(!code||!room)return;
  room.players.delete(socket.id); socket.to(code).emit('player-left',{id:socket.id});
  if(socket.id===room.hostId){ io.to(code).emit('room-closed'); rooms.delete(code); }
  else if(room.players.size===0) rooms.delete(code);
  socket.leave(code); delete socket.data.room; delete socket.data.role;
}
const port=process.env.PORT||3000;
server.listen(port,'0.0.0.0',()=>console.log(`Twofold server listening on http://localhost:${port}`));
