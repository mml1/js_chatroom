var express = require("express");
var app = express();
var path = require("path");

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.get("/", function(request, response){
	response.render("index");
})

var server = app.listen(8000, function(socket){
	console.log("Chatting on 8000")
})

var io = require("socket.io").listen(server);
var room = [];
io.sockets.on("connection", function(socket){
	io.emit("on", room);
	socket.on("mess_sent", function(data){
		room.push({"name": data.name, "message": data.mess})
		io.emit("update_chat", {name: data.name, message: data.mess})
	});
});