var express  = require("express");
var router   = express.Router();
var User     = require("../models/user");
var passport = require("passport");
var Recipe   = require("../models/recipe");

//INDEX - show all recipe
router.get("/", function(req, res){
res.redirect("/landing") 
});
//LANDINGPAGE
router.get("/landing", function(req, res){
//     Recipe.find({category: 'maindish'}, function(err, foundMaindish){
//      if(err){
//          console.log(err);
//      } else {  
//          res.render("landing",{mainDish: foundMaindish});
//      }
//    });
    var query = Recipe.find({});
    query.limit(12);
    query.exec(function(err, foundrecipe){
        if(err){
            console.log(err);
        } else {
            res.render("landing", { Recipe: foundrecipe});
        }
    });
});

//searching route
router.post("/landing", function(req, res){
    var searchItem = req.body.searchItem;
    var queryItem = Recipe.find({$text: {$search: searchItem}});
    queryItem.exec(function(err, foundrecipe){
        if(err){
            console.log(err);
        } else{
            res.render("searchResults", {Recipe: foundrecipe});
        }
    })
});

//AUTH ROUTES
router.get("/register", function(req, res){
    res.render("register");
});
// HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
   var newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       } else {
           passport.authenticate("local")(req, res, function(){
              res.redirect("/recipe"); 
           });
       } 
        
    });
});


//SHOW LOGIN FORM
router.get("/login", function(req, res){
   res.render("login"); 
});
// HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/recipe",
    failureRedirect: "/login"
}), function(req, res){
});
//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/recipe");
});
//WHETHER HAS LOGGEDIN
function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;