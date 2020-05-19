var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// AUTH ROUTES

router.get("/", (req,res) => {
    res.render("landing");
});


router.get("/register", (req, res) =>{
    res.render("register");
});

router.post("/register", (req, res) =>{
    
    req.flash("warning", "New registrations are closed to prevent spam!")
    return res.redirect("/campgrounds");

    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Login form
router.get("/login", (req, res) =>{
    res.render("login");
});

// Login logic
router.post("/login", passport.authenticate( "local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login", 
    }), (req, res) => {
    
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else { 
        res.redirect("/login");
    }
}

module.exports = router;