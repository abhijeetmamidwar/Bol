let socket = io();
let params;

function CreateMessageAndInsert(user, text, sent_received) {
  var div = document.createElement('div')
  var p = document.createElement('p')
  var h6 = document.createElement('h6')
  div.className = `New_Design_for_messages ${sent_received}`
  p.innerText = text
  h6.innerText = user
  div.appendChild(h6)
  div.appendChild(p)
  document.querySelector('.chatsnew').appendChild(div)
  div.scrollIntoView()
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

socket.on('totalmembers', function (data) {
  document.querySelector('.totalmembers').innerText = data
})

socket.on('newMessage', function(data) {
    // console.log('Received at room by sender and others',data);
    CreateMessageAndInsert(data.user, data.text, 'receive')
});

socket.on('setEnvironment', function(data) {
  document.querySelector('h3').innerText = data.user
  CreateMessageAndInsert('Admin', data.messagefromadmin, 'sent')
  CreateMessageAndInsert('Admin', 'Chat with your friends', 'sent')
})

socket.on('disconnect', function() {
    console.log('disconnected from server.');
});
  


document.querySelector('.arrow').addEventListener('click', function (e) {
  e.preventDefault()
  var message = document.querySelector('.message').value
  if (message.length) {
    CreateMessageAndInsert(params.user, message, 'sent')
    socket.emit('createMessage', {
      user: params.user,
      room: params.room,
      text: message
    })
  }
  
})