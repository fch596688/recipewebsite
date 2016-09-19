var mongoose  = require("mongoose");

var recipeSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    title: String,
    image: String,
    description: String,
    directions: String,
    ingredients: String,
    nutrition_facts: String,
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
       
    });

module.exports = mongoose.model("Recipe", recipeSchema);

