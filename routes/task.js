var express = require("express");
var router = express.Router({mergeParams: true});
var Task = require("../models/task");
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
    // lookup bullet using ID
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
            res.redirect("/bullet");
        } else {
            Task.create(req.body.task, function(err, task){
                if(err){
                    console.log(err);
                } else {
                    task.author.id = req.user._id;
                    task.author.username = req.user.username;
                    task.save();
                    bullet.tasks.push(task);
                    bullet.save();
                    req.flash("success", "Successfully added a new task");
                    res.redirect("/bullet/" + bullet._id);
                }
            });
        }
    });
});

// TASK EDIT ROUTE
router.get("/:taskId/edit", middleware.isLoggedIn, function(req, res){
    Task.findById(req.params.taskId, function(err, task){
      if(err){
          res.redirect("back");
      } else {
          res.render("tasks/edit", {bullet_id: req.params.id, task: task});
      }
   });
});

// TASK UPDATE ROUTE
router.put("/:taskId", function(req, res){
    Task.findByIdAndUpdate(req.params.taskId, req.body.task, function(err, task){
        if(err){
            res.render("edit");
        } else {
            res.redirect("/bullet/" + req.params.id);
        }
    });
});

// TASK DESTROY ROUTE
router.delete("/:taskId", middleware.checkNoteOwernship, function(req, res){
    Task.findByIdAndRemove(req.params.taskId, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "TASK DELETED");
            res.redirect("/bullet/");
        }
    });
});

module.exports = router;