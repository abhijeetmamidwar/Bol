// REFER THIS LINK FOR EVERY CONFUSION
// https://stackoverflow.com/questions/32674391/io-emit-vs-socket-emit

const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/public", express.static("public"));
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
///////////////// USER DEFINED FUNCTIONS /////////////

const {create_Room, check_RoomPresent} = require('./server_side')

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Components/home.html")
})

// app.get("/",(req, res) => {
//     res.sendFile(__dirname + '/Components/index.html')
// })

app.post("/createRoom", (req, res) => {
    console.log("Create Room Invoked");
    const room = req.body.Croom
    const user = req.body.Cname
    const key = req.body.Ckey
    let result = create_Room(room, user, key)
    if (result.flag) {
        console.log(result);
        res.sendFile(__dirname + '/Components/home.html')
    }
    else{
        console.log(result);
    }
})


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newMessage', function (data) {
        // socket.to(`${data.room}`).emit('newMessage',{
        //     user: data.user,
        //     room: data.room,
        //     text: data.text
        // }, function () {
        //     console.log("Error Occured", data);
        // })
        io.emit('newMsg', data)
    })

    // socket.on('createRoom', function (data) {
    //     const room = data.room
    //     const user = data.user
    //     const key = data.key
    //     let result = create_Room(room, user, key)
    //     if (result.flag) {
    //         console.log('socket', result);
    //         socket.join(room);
    //         // res.sendFile(__dirname + '/Components/home.html')
    //     }
    //     else{
    //         console.log(result);
    //     }
    // })

    // socket.on('join', function(data) {
    //     console.log(data);
    //     // socket.join(data.room);
    // });

    socket.on('disconnect', function () {
        console.log("A user Disconnected");
    })

});


server.listen(3000, () => {
    console.log("Server Started on port 3000");
})