var express = require("express");
var app = express();
var rp = require('request-promise'); 

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", (req, res) => {
    
    var query = req.query.search;
    var url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`;
    rp(url)
    .then( (body) => {
        var data = JSON.parse(body);
        //console.log(data);
        res.render("results", {data : data});
    })
    .catch( (err) => {
        console.log(err);
    });

});

app.listen(3000, "localhost", () =>{
    console.log("Listening...")
})