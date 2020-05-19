var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/love/", function(req, res){
    res.render("love", {name: "Your self"});
});

app.get("/love/:name", function(req, res){
    var name = req.params.name.toUpperCase();
    res.render("love", {name: name});
});

friends = ["Cisco", "Giova", "Greg", "Moro"]

app.post("/addFriend", function(req,res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends")
});

app.get("/friends/", function(req, res){
    res.render("friends", {friends : friends});
});


app.listen(3000, "localhost", function(){
    console.log("Server is listening!");
});