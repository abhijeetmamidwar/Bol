// REFER THIS LINK FOR EVERY CONFUSION
// https://stackoverflow.com/questions/32674391/io-emit-vs-socket-emit

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// USER DEFINED //
const {check_key, validate_name_room} = require('./appSide')

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log("New User Connected");

    socket.on('join', (params, callback) => {
        if(!validate_name_room(params.user, params.room)){
          return callback('Name and Room are required (Non Empty)');
        }
        else if (!check_key(params.key)) {
            return callback("Wrong Room and Key Combination")
        }
    
        socket.join(params.room);
        io.to(socket.id).emit('setEnvironment', {user: params.user, room:params.room})
        // console.log(socket.id);
        // users.removeUser(socket.id);
        // users.addUser(socket.id, params.name, params.room);
    
        // io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        // socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));
    
        // socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));
    
        // callback();
    })

    socket.on('createMessage', function (params) {
        // console.log(params)
        socket.broadcast.to(`${params.room}`).emit('newMessage', {user:params.user, room:params.room, text:params.text})
        // io.to(`${params.room}`).emit('newMessage', {user:params.user, room:params.room, text:params.text})
    })

    

    socket.on('disconnect', function () {
        console.log("User Disconneted");
    })
})

server.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is Up and Running`);
})