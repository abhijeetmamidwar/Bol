// REFER THIS LINK FOR EVERY CONFUSION
// https://stackoverflow.com/questions/32674391/io-emit-vs-socket-emit
require("dotenv").config()
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// USER DEFINED //
const {check_key, validate_name_room, create_Room} = require('./appSide')
const {Rooms} = require('./utilities/rooms')

let rooms = new Rooms()

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log("New User Connected");

    socket.on('join', (params, callback) => {
        
        if(!validate_name_room(params.user, params.room)){
          return callback('Name and Room are required (Non Empty)');
        }
        else if (params.option !== 'CREATE' && !check_key(rooms["rooms"], params.room, params.key)) {
            return callback("Wrong Room and Key Combination OR Room do not exist")
        }

        if(params.option === 'CREATE'){
            if(create_Room(rooms["rooms"], params)){
                return callback("Room Name Already Exist Try Different Name")
            }
            else
                rooms.addroom(params.room, params.key)
        }
    
        socket.join(params.room);
        rooms.adduser(socket.id, params.room)
        var messagefromadmin = `Welcome to Chatting App\n
          :- Developed by ${process.env.PROJECTOWNER}\n`
        io.to(socket.id).emit('setEnvironment', {user: params.user, messagefromadmin: messagefromadmin, room:params.room})
        
        io.in(`${params.room}`).emit('totalmembers', rooms.total_users_in_room(params.room));
        
        // io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        // socket.emit('newMessage', generateMessage('Admin', `Welocome to ${params.room}!`));
    
        // socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', "New User Joined!"));
    
        // callback();
    })

    socket.on('createMessage', function (params) {
        socket.broadcast.to(`${params.room}`).emit('newMessage', {user:params.user, room:params.room, text:params.text})
        // io.to(`${params.room}`).emit('newMessage', {user:params.user, room:params.room, text:params.text})
    })

    

    socket.on('disconnect', function () {
        var inform_others_in_room = rooms.removeuser(socket.id)
        if(inform_others_in_room){
            io.in(`${inform_others_in_room}`).emit('totalmembers', rooms.total_users_in_room(inform_others_in_room));
        }
        console.log("User Disconneted");
    })
})

server.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is Up and Running`);
})