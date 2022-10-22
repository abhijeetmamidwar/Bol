var socket = io()

function ScrollToLastMessage() {
    const last_msg = document.querySelector("p:last-child")
    console.log(last_msg.textContent);
    last_msg.scrollIntoView();
}


// socket.on('connect', function () {
//     console.log("Connected to server from client page");
//     socket.on('join', 'webdev')
//     // socket.emit('createRoom', function () {
//     //     console.log("Room page");
//     //     // socket.on('join', 'webdev')
//     // })
// })

socket.on('newMsg', function (data) {
    console.log('newMsg', data);
    var p = document.createElement('p')
    p.innerText = data.text
    document.getElementsByClassName('chatsnew').appendChild(p)
    ScrollToLastMessage()
})


document.querySelector(".arrow").addEventListener("click", function(e){
    e.preventDefault()
    socket.emit('newMessage', {
        user: "New One",
        room: "WebDev",
        text: "New Message from emit"
    })
})