var express = require("express");
var router = express.Router({mergeParams: true});
var taskList = require("../models/taskList");
var Bullets = require("../models/bullet");
var middleware = require("../middleware");

// ====================
// ADD task ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function(req, res){
    // find bullet by id
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
        } else {
            res.render("tasks/new", {bullet: bullet});
        }
    });
});

// Task Create Route
router.post("/", middleware.isLoggedIn, function(req, res){
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
            res.redirect("/bullet");
        } else {
            taskList.create(req.body.tasklist, function(err, task){
                if(err){
                    console.log(err);
                } else {
                    task.author.id = req.user._id;
                    task.author.username = req.user.username;
                    task.save();
                    bullet.taskList.push(task);
                    bullet.save();
                    req.flash("success", "Successfully added a new task");
                    res.redirect("/bullet/" + bullet._id);
                }
            });
        }
    });
});

module.exports = router;