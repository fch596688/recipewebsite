var Recipe  = require("../models/recipe");
var Comment = require("../models/comment");
//middleware goes here

var middlewareObj = {};

middlewareObj.checkRecipeOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id, function(err, foundRecipe){
           if(err){
               req.flash("error", "Recipe Not Found!");
               res.redirect("back");
           } else {
               // does user own the recipe ?
               if(foundRecipe.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "No Permission To Do That!")
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               req.flash("error", "Comment Not Found!");
               res.redirect("back");
           } else {
               // does user own the recipe ?
               if(foundComment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "No Permission To Do That!");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}




module.exports = middlewareObj;









