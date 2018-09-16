var socket = io();

User = prompt("Enter Your Name");

$("form").submit(function () {
  socket.emit("chat message",$("input").val());
  $("input").val("");
  return false;
});

$("input").on("keydown",function () {
  socket.emit("typing","typing");
});

$("input").on("keyup",function () {
  socket.emit("nottyping","");
});

socket.on('typing',function (typing) {
  $("#typing").text("typing..");
});
socket.on('nottyping',function (nottyping) {
  $("#typing").text(nottyping);
});

socket.on('chat message',function (msg) {
  $("ul").append("<li class='text-right m-3'>"+User+" : "+msg+"</li>");
});

socket.on('status',function () {
  $('ul').append("<li><b><i>A new user connected</i></b><li>");
});
socket.on('disconnect',function () {
  $('ul').append("<li><b><i>A user disconnected</i></b></li>");
});
