![woman](woman.png)
# 初始化项目
```
npm init -y
```

# 安装依赖的模块
```
npm install express mongoose socket.io -S
```

# 安装并布署服务器

# 附录知识
## 如何找到出问题的情况并且终止它
### window
如何知道谁占用了我的8080端口
```
netstat -anto | findstr "8080"
```

### mac linux
```
ps -ef | grep 8080
kill -9 9080
```
