document.addEventListener('DOMContentLoaded',()=>{
const name=prompt("Enter your name to join :");
const socket=io('http://localhost:8800');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector('.container')
const heading=document.querySelector('.welcome')
var audio= new Audio('ting.mp3')
heading.innerText=`Welcome to weChat ${name} !`
const append=(message,position,color)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.style.backgroundColor=color;
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
};
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
});
socket.emit('new-user-joined', name);
socket.on('user-joined',info=>{
    append(`${info.name} joined the chat`,'left',info.color);
});
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left',data.color);
});  
socket.on('left',data=>{
    append(`${data.name} left the chat`,'left',data.color);
}); 
});