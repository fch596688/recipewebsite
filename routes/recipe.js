var express = require("express");
var router  = express.Router();
var Recipe  = require("../models/recipe");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var multer = require("multer");
var upload = multer({dest:'uploads/'});
var fs = require("fs");
var path = require("path");

//SHOW ALL RECIPE
router.get("/", function(req, res){
   //get all recipes from DB
    Recipe.find({}, function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("recipe/index", {recipes: foundRecipe});
        }
    });
});

//CREATE - add  a new recipe to DB 
router.post("/", middleware.isLoggedIn, upload.any(), function(req, res){
   //get data from form and add to recipes array
    if(req.files){
        req.files.forEach(function(file){
            console.log(file);
            var filename = (new Date).valueOf()+"-"+file.originalname
            fs.rename(file.path, "public/assets/image/"+ filename, function(err){
                if(err) throw err;
                console.log("file upload...");
                var author = {
                    id: req.user._id,
                    username: req.user.username
                }
                var title = req.body.recipe.title;
                var image = filename;
                var description = req.body.recipe.description;
                var directions = req.body.recipe.directions;
                var ingredients = req.body.recipe.ingredients;
                var nutrition_facts = req.body.recipe.nutrition_facts;
                var newRecipe = {
                    title: title,
                    image: image,
                    description: description,
                    directions: directions,
                    ingredients: ingredients,
                    nutrition_facts: nutrition_facts,
                    author: author
                }
                Recipe.create(newRecipe, function(err, newlyCreated){
                    if(err){
                        console.log(err);
                        req.flash("error", "Create Recipe Failure!");
                        res.redirect("back");
                    } else {
                        console.log(newlyCreated);
                        req.flash("success", "Thanks for sharing your recipe!");
                        res.redirect("/recipe");
                    }
                });
            });
        });
    }
});

//NEW - show form to create a new recipe
router.get("/new-recipe", middleware.isLoggedIn, function(req, res){
   res.render("recipe/new-recipe"); 
});

//SHOW - show more info about one recipe
router.get("/:id", function(req, res){
   Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
       if(err){
           console.log(err);
       } else {
           console.log(foundRecipe);
           res.render("recipe/show-recipe", {recipe: foundRecipe});
       }
   }) 
});

//CREATE Comments
router.post("/:id/comments", middleware.isLoggedIn, function (req, res){
   Recipe.findById(req.params.id, function(err, recipe){
       if(err){
           console.log(err);
       } else {
           Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else{
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save  comment
                  comment.save();
                  recipe.comments.push(comment);
                  recipe.save();
                  req.flash("success", "Add a comment successfully!");
                  res.redirect('/recipe/' + recipe._id);
              }
           });
       }
   }) ;
});
//COMMENT UPDATE
router.put("/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          req.flash("error", "Cannot Found Comment!")
          res.redirect("back");
      } else {
          req.flash("success", "Update your comment successfully!");
          res.redirect("/recipe/" + req.params.id);
      }
   }); 
});

//COMMENT DESTROY ROUTE
router.delete("/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Cannot Found Comment!");
            res.redirect("back");
        } else {
            req.flash("success", "Delete the comment successfully!");
            res.redirect("/recipe/" + req.params.id);
        }
    });
});
//Edit Recipe ROUTE
router.get("/:id/edit-recipe", middleware.checkRecipeOwnership, function(req, res){
    Recipe.findById(req.params.id, function(err, foundRecipe){
       if(err){
           res.redirect("/recipe");
       } else {
           res.render("recipe/edit-recipe", {recipe: foundRecipe}); 
       }
    });
});

//UPDATE Recipe ROUTE
router.put("/:id", middleware.checkRecipeOwnership, function(req, res){
   Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedRecipe){
     if(err){
         req.flash("error", "Update Recipe Failed!")
         res.redirect("/recipe");
     } else {
         req.flash("success", "Your recipe has been updated!");
         res.redirect("/recipe/" + req.params.id);
     }
   });
});

//DELETE Recipe ROUTE

router.delete("/:id", middleware.checkRecipeOwnership, function(req, res){
   Recipe.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Delete Recipe Failed!");
          res.redirect("/recipe");
      } else {
          req.flash("success", "Delete Recipe Successfully!");
          res.redirect("/recipe");
      }
   }); 
});

module.exports = router;