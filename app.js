var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    cookieParser            = require("cookie-parser"),
    flash                   = require("connect-flash"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    Bullets                 = require("./models/bullet"),
    Note                    = require("./models/note"),
    User                    = require("./models/user"),
    Task                    = require("./models/task"),
    seedDB                  = require("./seeds");

// requiring routes
var noteRoutes              = require("./routes/note"),
    bulletRoutes            = require("./routes/bullet"),
    indexRoutes             = require("./routes/index"),
    taskRoutes              = require("./routes/task");

// mongoose.connect("mongodb://localhost/bullet");
mongoose.connect("mongodb://greg:gruglife@ds017553.mlab.com:17553/bulletjournal");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My very own bulleting journal",
    resave: false,
    saveUninitizalized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/bullet", bulletRoutes);
app.use("/bullet/:id/notes", noteRoutes);
app.use("/bullet/:id/tasks", taskRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});