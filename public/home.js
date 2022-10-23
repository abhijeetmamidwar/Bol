let socket = io();
let params;

// function scrollToBottom() {
//   let messages = document.querySelector('.chatsnew').lastElementChild;
//   messages.scrollIntoView();
// }

function CreateMessageAndInsert(text, sent_received) {
  var p = document.createElement('p')
  p.innerText = text
  p.className = sent_received
  document.querySelector('.chatsnew').appendChild(p)
  p.scrollIntoView()
}

socket.on('connect', function() {
  let searchQuery = window.location.search.substring(1);
  params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');

  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No Error');
    }
  })
});

socket.on('newMessage', function(data) {
    // console.log('Received at room by sender and others',data);
    CreateMessageAndInsert(data.text, 'receive')
    // scrollToBottom();
});

socket.on('disconnect', function() {
    console.log('disconnected from server.');
});
  


document.querySelector('.arrow').addEventListener('click', function (e) {
  e.preventDefault()
  CreateMessageAndInsert(document.querySelector('.message').value, 'sent')
  scrollToBottom();
  socket.emit('createMessage', {
    user: params.name,
    room: params.room,
    text: document.querySelector('.message').value
  })
})