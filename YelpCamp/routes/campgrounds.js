var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// CAMPGROUNDS ROUTES
router.get("/", (req,res) => {
    Campground.find({}, (err,campgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    })
});
//CREATE
router.post("/", middleware.isLoggedIn, (req,res) => {

    var author = {
        id: req.user._id,
        username: req.user.username
    }
    req.body.campground.author = author

    Campground.create(req.body.campground, (err, camp) => {
        if(err){
            console.log(err);
        } else {
            console.log(camp);
            res.redirect("/campgrounds");
        }
    });

});
// NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});
// SHOW
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec( (err, found) =>{
        if(err || !found){
            console.log(err);
            req.flash("error", "Campground not found.")
            res.redirect("back");
        } else {
            res.render("campgrounds/show", { campground: found});
        }
    });
});
// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) =>{
    Campground.findById(req.params.id, (err, found) =>{
        if(err || !found){
            console.log(err);
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", { campground: found});
        }
    });
});
// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, update) =>{
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;