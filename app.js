var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    http       = require("http").Server(app),
    io         = require("socket.io")(http);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

app.get("/",function (req,res) {
  res.render("index");
});

io.on('connection',function (socket) {
  console.log('A user connected');
  io.emit('status','A user connected');

  socket.on('disconnect',function () {
    console.log('A user disconnected');
    io.emit('disconnect','A user disconnected');
  });


  socket.on('chat message',function (msg) {
    io.emit('chat message',msg);
  });
  socket.on('typing',function (typing) {
    console.log(typing);
    io.emit('typing',typing);
  });
  socket.on('nottyping',function (nottyping) {
    console.log(nottyping);
    io.emit('nottyping',nottyping);
  });
});

http.listen(8080,function () {
  console.log("Server 8080 mai daud raha hai");
});
