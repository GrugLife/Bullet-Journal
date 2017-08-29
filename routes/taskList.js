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