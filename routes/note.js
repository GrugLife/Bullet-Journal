var express = require("express");
var router = express.Router({mergeParams: true});
var Note = require("../models/note");
var Bullets = require("../models/bullet");
var middleware = require("../middleware");

// ====================
// ADD NOTES ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function(req, res){
    // find bullet by id
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
        } else {
            res.render("notes/new", {bullet: bullet});
        }
    });
});

// NOTE CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup bullet using ID
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
            res.redirect("/bullet");
        } else {
            Note.create(req.body.note, function(err, note){
                if(err){
                    console.log(err);
                } else {
                    note.author.id = req.user._id;
                    note.author.username = req.user.username;
                    note.save();
                    bullet.notes.push(note);
                    bullet.save();
                    req.flash("success", "Successfully added a new note");
                    res.redirect("/bullet/" + bullet._id);
                }
            });
        }
    });
});

// NOTE EDIT ROUTE
router.get("/:noteId/edit", middleware.isLoggedIn, function(req, res){
    Note.findById(req.params.noteId, function(err, note){
        if(err) {
            res.redirect("back");
        } else {
            res.render("notes/edit", {bullet_id: req.params.id, note: note});
        }
    });
});

// NOTE UPDATE ROUTE
router.put("/:noteId", function(req, res){
    Note.findByIdAndUpdate(req.params.noteId, req.body.note, function(err, note){
        if(err) {
            res.render("edit");
        } else {
            res.redirect("/bullet/" + req.params.id);
        }
    });
});

// NOTE DESTROY ROUTE
router.delete("/:noteId", middleware.checkNoteOwernship, function(req, res){
    Note.findByIdAndRemove(req.params.noteId, function(err){
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "NOTE DELETED");
            res.redirect("/bullet/" + req.params.id);
        }
    });
});

module.exports = router;