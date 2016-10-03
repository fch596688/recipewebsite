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
    category:String,
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
       
    });

recipeSchema.index({title:'text', description: 'text', directions: 'text', ingredients:'text', nutrition_facts:'text', category:'text'});
module.exports = mongoose.model("Recipe", recipeSchema);

