// 初始化，传入一个Socket.IO的参数socket
var Chat = function (socket) {
  this.socket = socket;
};

// 添加发送消息的函数
Chat.prototype.sendMessage = function (room, txt) {
  var message = {
    room: room,
    text: text,
  };
  this.socket.emit("message", message);
};

// 变更房间的函数
Chat.prototype.changeRoom = function (room) {
  this.socket.emit("join", {
    newRoom: room,
  });
};

// 处理聊天命令
Chat.prototype.processCommand = function (command) {
  var words = command.split(" ");
  var command = words[0]
    .substring(1, words[0].length) // 从第一个单词开始解析命令
    .toLowerCase();

  var message = false;
  switch (command) {
    case "join":
      words.shift();
      var room = words.join(" "); // 处理房间的变化/切换
      this.changeRoom(room);
      break;
    case "nick":
      words.shift();
      var name = words.join(" ");
      this.socket.emit("nameAttempt", name); // 处理更名尝试
      break;
    default:
      message = "错误命令！"; // 如果无法识别，返回错误消息
      break;
  }
  return message;
};
