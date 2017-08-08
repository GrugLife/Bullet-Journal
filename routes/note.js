var express = require("express");
var router = express.Router({mergeParams: true});
var Note = require("../models/note");
var Bullets = require("../models/bullet");

// ====================
// ADD NOTES ROUTES
// ====================

router.get("/new", isLoggedIn, function(req, res){
    // find bullet by id
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
        } else {
            res.render("notes/new", {bullet: bullet});
        }
    });
});

router.post("/", isLoggedIn, function(req, res){
    // lookup bullet using ID
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
            res.redirect("/bullet");
        } else {
            console.log(req.body.note);
            Note.create(req.body.note, function(err, note){
                if(err){
                    console.log(err);
                } else {
                    bullet.notes.push(note);
                    bullet.save();
                    res.redirect("/bullet/" + bullet._id);
                }
            });
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