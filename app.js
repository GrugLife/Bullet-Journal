var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Bullets                 = require("./models/bullet"),
    Note                    = require("./models/note"),
    seedDB                  = require("./seeds");
    
mongoose.connect("mongodb://localhost/bullet");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


// HOME PAGE
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX ROUTE
app.get("/bullet", function(req, res){
    Bullets.find({}, function(err, allBullets){
        if(err){
            console.log(err);
        } else {
            res.render("bullets/index", {bullets: allBullets});
        }
    });
});

// CREATE ROUTE
app.post("/bullet", function(req, res){
    var task = req.body.task;
    var desc = req.body.description;
    var createdDate = req.body.createdDate;
    var dueDate = req.body.dueDate;
    var newBullet = {task: task, description: desc, createdDate: createdDate, dueDate: dueDate};
    Bullets.create(newBullet, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/bullet");
        }
    });
});

// NEW ROUTE
app.get("/bullet/new", function(req, res) {
    res.render("bullets/new");
});

// SHOW ROUTE
app.get("/bullet/:id", function(req, res){
    Bullets.findById(req.params.id, function(err, foundBullet){
        if(err){
            console.log(err);
        } else{
            res.render("bullets/show", {bullet: foundBullet});
        }
    });
});

// ====================
// ADD NOTES ROUTES
// ====================

app.get("/bullet/:id/notes/new", function(req, res){
    // find bullet by id
    Bullets.findById(req.params.id, function(err, bullet){
        if(err){
            console.log(err);
        } else {
            res.render("notes/new", {bullet: bullet});
        }
    });
});

app.post("/bullet/:id/notes", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});