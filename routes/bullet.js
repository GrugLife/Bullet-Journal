var express = require("express");
var router = express.Router();
var Bullets = require("../models/bullet");

// INDEX ROUTE
router.get("/", isLoggedIn, function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
    var task = req.body.task;
    var desc = req.body.description;
    var createdDate = req.body.createdDate;
    var dueDate = req.body.dueDate;
    var newBullet = {task: task, description: desc, createdDate: createdDate, dueDate: dueDate};
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
router.get("/new", isLoggedIn, function(req, res) {
    res.render("bullets/new");
});

// SHOW ROUTE
router.get("/:id", isLoggedIn, function(req, res){
    // find the bullet with the provided ID
    Bullets.findById(req.params.id).populate("notes").exec(function(err, foundBullet){
        if(err){
            console.log(err);
        } else {
            // render show template with that bullet
            res.render("bullets/show", {bullet: foundBullet});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;