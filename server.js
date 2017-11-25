//引入express
let express = require('express');
//引入socket.io
let path = require('path');
let app = express();
//当客户端以GET方式访问/路径的时候执行对应的回调函数
app.get('/',function(req,res){
  res.sendFile(path.resolve('index.html'));
});
//这个是一个http的服务器实例
let server = require('http').createServer(app);
//是一个Websocket服务器实例
let io = require('socket.io')(server);
//监听客户端的连接请求，当客户端连接上来之后执行对应的回调函数
//每个客户端都有一个自己的socket
io.on('connection',function(socket){
  //监听客户端发过来的消息
  socket.on('message',function(data){
    console.log(data);
    socket.send(`服务器回应:${data}`);
  });
});

server.listen(8080);