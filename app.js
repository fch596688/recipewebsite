var bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    express       = require("express"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash"),
    app           = express(),
    User          = require("./models/user"),
    Recipe        = require("./models/recipe"),
    Comment       = require("./models/comment");


// REQUIRE ROUTES
var recipeRoutes  = require("./routes/recipe"),
    indexRoutes   = require("./routes/index");
    
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/recipe_go");//connect local mongodb
mongoose.connect("mongodb://changhao:changhao@ds019053.mlab.com:19053/webdev-changhao");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));//set the default path to search static files
app.use(methodOverride("_method"));// initilize 
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I'm a good boy.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/recipe", recipeRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The recipe go server has started!"); 
});