var submit_button = document.querySelector("#submit_button")
var socket = io()

submit_button.addEventListener("click", function(e){
    e.preventDefault()
    socket.emit("")
})
