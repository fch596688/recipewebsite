var mongoose = require("mongoose");

//define comment data model
var commentSchema = mongoose.Schema({
    text:String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    date: {
        type:Date, default:Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);

