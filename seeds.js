var mongoose = require("mongoose");
var Recipe   = require("./models/recipe");
var Comment  = require("./models/comment");


var data = [
    {
        title: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        ingredients: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        directions:"1.haha. 2 hehe 3. xixi",
        nutrition_facts:"2l;kd;fj;a;lfkajdl;kfalkdfja;lkdfjal;kj"
    },
    {
        title: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        ingredients: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        directions:"1.haha. 2 hehe 3. xixi",
        nutrition_facts:"2l;kd;fj;a;lfkajdl;kfalkdfja;lkdfjal;kj"
    },
    {
        title: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        ingredients: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        directions:"1.haha. 2 hehe 3. xixi",
        nutrition_facts:"2l;kd;fj;a;lfkajdl;kfalkdfja;lkdfjal;kj"
    }
];

function seedDB(){
    //Remove all recipes
    Recipe.remove({}, function(err){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("removed recipe!");
//               //Remove all comments
//            Comment.remove({}, function(err){
//               if(err){
//                   console.log(err);
//               } else {
//                   console.log("removed comments!");
//               }
//            });
//       } 
//    });
//    //Add recipes
//    data.forEach(function(seed){
//       Recipe.create(seed, function(err, recipe){
//           if(err){
//               console.log(err);
//           } else {
//               console.log("add an new recipe!");
////               //create a comment
////               Comment.create(
////                   {
////                   text:"This is great recipe",
////                   author:"Homer"
////                    }, function(err, comment){
////                       if(err){
////                           console.log(err);
////                       } else {
////                           recipe.comments.push(comment);
////                           recipe.save();
////                           console.log("Created new comment");
////                        }
////                });
//            }    
//        }); 
    });
}

module.exports = seedDB;