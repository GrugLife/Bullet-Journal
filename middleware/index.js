var Bullet = require("../models/bullet");
var Note = require("../models/note");
module.exports ={
    checkBulletOwnership: function(req, res, next) {
        if(req.isAuthenticated()){
            Bullet.findById(req.params.id, function(err, foundBullet){
                if(err) {
                    req.flash("error", "Bullet not found");
                    res.redirect("back");
                } else {
                    next();
                }
            });
        }    else {
                req.flash("error", "You need to be logged in to do that");
                res.redirect("back");
            }
    },
    checkNoteOwernship: function(req, res, next) {
        if(req.isAuthenticated()){
            Note.findById(req.params.note_id, function(err, foundNote){
                if(err) {
                    res.redirect("back");
                } else {
                    next();
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
    },
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};




