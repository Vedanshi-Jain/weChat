//Node server which will handle socket io connections
//const io=require('socket.io')(8000)
const io=require('socket.io')(8800,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
const users={};
function randomColor(){
    a=(Math.floor((Math.random())*50))+200;
    b=(Math.floor((Math.random())*50))+200;
    c=(Math.floor((Math.random())*50))+200;
    let color=`rgb(${a},${b},${c})`;
    return color;
}
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]={
            name:name,
            color: randomColor()
        }
        socket.broadcast.emit('user-joined',{name:name,color:users[socket.id].color});
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{ name:users[socket.id].name,message : message,color:users[socket.id].color })
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})