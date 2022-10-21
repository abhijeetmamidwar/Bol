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

const {create_Room} = require('./server_side')

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/Components/home.html")
// })

app.get("/",(req, res) => {
    res.sendFile(__dirname + '/Components/index.html')
})

app.post("/createRoom", (req, res) => {
    console.log("Create Room Invoked");
    const room = req.body.room
    const user = req.body.name
    const key = req.body.key
    let result = create_Room(room, user, key)
    if (result) {
        console.log(result);
        // res.render("home.html", {user : user})
    }
})

app.post("/joinRoom", (req, res) => {
    console.log("Join Room Invoked");
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log("A user Disconnected");
    })

    


});


server.listen(3000, (err) => {
    console.log("Server Started on port 3000");
})