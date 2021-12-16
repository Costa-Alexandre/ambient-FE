const {Server} = require('socket.io');

const io = new Server();

io.on('connection', (socket) => { // Listen on the 'connection' event for incoming sockets
  console.log('A user just connected');
  
  const get_participant_with_socket = (participant) => {
    return {
      ...participant,
      socketId: socket.id,
      roomId: participant.activeShow._id
    }
  }

  socket.on('user-join-show', (participant) => {
    const roomId = participant.activeShow._id
    socket.join(roomId);
    console.log("user joined", io.sockets.adapter.rooms);
    // console.log(participant_with_socket);
    socket.broadcast.to(roomId).emit('user-joined-show', get_participant_with_socket(participant));
  });

  socket.on('call', ({participant, socketId}) => {
    console.log('calling', socketId);
    socket.broadcast.to(socketId).emit('called', get_participant_with_socket(participant))
  });

  socket.on('leave-show', (room) => {
    socket.leave(room); 
    console.log(socket.id, "left", room)
    socket.broadcast.to(room).emit('user-left-show', socket.id)
    // console.log("user left", io.sockets.adapter.rooms);
  })
  
  socket.on('disconnect', (reason) => {
    console.log(reason, socket.rooms, socket.id) // somehow disconnect from sockets here or somehow else disconnect when reloading the app 
  })

  socket.on('playback-update', ({playerState, showId}) => {
    console.log(showId)
    socket.broadcast.to(showId).emit('playback-updated', playerState)
  })

  socket.on('playback-initial-sync', ({toUserId, playerState}) => {
    console.log(toUserId, playerState)
    socket.broadcast.to(toUserId).emit('playback-updated', playerState)
  })

  socket.on('message-send', ({showId, message, user}, callback) => {
    console.log(`${user.displayName} says: ${message}`)
    callback({message, user})
    socket.to(showId).emit('message-receive', {message, user})
  })

  socket.on('toggle-mute', (showId, peerId, isMuted) => {
    console.log('mute event');
    socket.broadcast.to(showId).emit('toggle-mute', peerId, isMuted);
  })

});

io.listen(3000, console.log("Listening on port 3000"));