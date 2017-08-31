var express = require("express");
var router = express.Router();
var Bullets = require("../models/bullet");
var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all bullets from DB
    Bullets.find({}, function(err, allBullets){
        if(err){
            console.log(err);
        } else {
            res.render("bullets/index", {bullets: allBullets});
        }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var task = req.body.task;
    var desc = req.body.description;
    var createdDate = req.body.createdDate;
    var dueDate = req.body.dueDate;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBullet = {task: task, description: desc, createdDate: createdDate, dueDate: dueDate, author: author};
    // Create a new bullet and save to DB
    Bullets.create(newBullet, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/bullet");
        }
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("bullets/new");
});

// SHOW ROUTE
router.get("/:id", middleware.isLoggedIn, function(req, res){
    // find the bullet with the provided ID
    Bullets.findById(req.params.id).populate("notes").populate("tasks").exec(function(err, foundBullet){
        console.log(req.params.task)
        if(err){
            // console.log(err);
        } else {
            // render show template with that bullet
            res.render("bullets/show", {bullet: foundBullet});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkBulletOwnership, function(req, res) {
    Bullets.findById(req.params.id, function(err, foundBullet){
        if(err) {
            console.log(err);
        } else {
            res.render("bullets/edit", {bullet: foundBullet});    
        }
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkBulletOwnership, function(req, res){
    var newData = {task: req.body.task, description: req.body.description};
    Bullets.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, bullet){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "Successfully Updated!");
            res.redirect("/bullet/" + bullet._id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkBulletOwnership, function(req, res){
    Bullets.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/bullet");
        } else {
            res.redirect("/bullet");
        }
    });
});



module.exports = router;