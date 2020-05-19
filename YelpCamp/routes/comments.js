var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS ROUTES

// NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong.");
        } else {
            res.render("comments/new", {campground : campground});
        }
    });
});
// CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {

    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Succesfully added comment.");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});
//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err,foundCampground) => {
        if(err || !foundCampground ){
            console.log(err);
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, (err, found) => {
            if(err || !found ){
                console.log(err);
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                res.render('comments/edit', {campground_id : req.params.id, comment: found});
            }
        });
    });
});
//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, update) =>{
        if(err || !found ){
            console.log(err);
            req.flash("error", "Comment not found");
            res.redirect("back");
        } else{
            req.flash("success", "Comment edited.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;