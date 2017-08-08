var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    Bullets                 = require("./models/bullet"),
    Note                    = require("./models/note"),
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");

// requiring routes
var noteRoutes              = require("./routes/note"),
    bulletRoutes            = require("./routes/bullet"),
    indexRoutes             = require("./routes/index")

mongoose.connect("mongodb://localhost/bullet");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My very own bulleting journal",
    resave: false,
    saveUninitizalized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/bullet", bulletRoutes);
app.use("/bullet/:id/notes", noteRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});