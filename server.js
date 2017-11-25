//引入express
let express = require('express');
let {Message} = require('./model');
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
  socket.on('message',function(content){
    //当收到客户端发过来的消息的时候保存到数据库里
    let message = {content};
    Message.create(message,function(err,doc){
      //广播给所有的客户端
      io.emit('message',doc);//_id
    });
  });
  //监听客户端获取全部消息的事件
  socket.on('getAllMessages',function(){
    Message.find().sort({createAt:-1}).limit(10).exec(function(err,messages){
      //向客户端发送全量消息
      messages.reverse();
      socket.emit('allMessages',messages);
    });
  });
});

server.listen(8080);
/**
 * 1. 聊天
 *    1. 给按钮绑定点击事件
 *    2. 当点击的时候执行一个方法，在方法里获取文件框的值
 *    3. 把文件框的值通过消息发送给服务器
 *    4. 服务器把消息通过广播发给所有的客户端
 *    5. 客户端收到消息后把此消息添加到消息列表中
 **/