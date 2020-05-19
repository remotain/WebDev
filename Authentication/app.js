var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongose = require("passport-local-mongoose");

var app = express();

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(require("express-session")({
    secret : "Secret jappering used to encode the session",
    resave: false,
    saveUninitialized : false
}));
// Initizlize session
app.use(passport.initialize());
app.use(passport.session());
// Serialize/Deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Authenticate user with local strategy
passport.use(new LocalStrategy(User.authenticate()));

// Mongoose configuration
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to mongo db
mongoose.connect("mongodb://localhost/auth_demo_app");

// Routes

// INDEX
app.get("/", (req,res) => {
    res.render("home");
});

// SECRET
app.get("/secret", isLoggedIn, (req,res) => {
    res.render("secret");
});

// REGISTER FORM
app.get("/register", (req,res) => {
    res.render("register");
});

// REGISTER POST
app.post("/register", (req,res) => {

    // Don't pass the password at user creation, in order to avoid saving it
    // directly to the database. The passowrd instead is passed as parameter 
    // of the register function, which take care of hash it and save the has 
    // into the database.
    User.register(new User({username: req.body.username}), req.body.password, (err,user) =>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("secret");
        })
    });

});

// LOGIN FORM
app.get("/login", (req, res) =>{
    res.render("login");
});

// LOGIN POST
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "login" 
}), (req, res) => {

});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, "localhost", () =>{
    console.log("Listening...");
});