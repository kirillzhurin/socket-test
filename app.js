const app = require('express')();
const http = require('http').Server(app);       
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('chat message', msg => {
    console.log('message:', msg);
    socket.broadcast.emit('chat message', msg);
  });
})

http.listen(port, () => console.log(`Server has been started on ${port}`));