// Require necessary NPM Packages
const mongoose = require('mongoose');

// Define Article Schema
const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    author: {type: String, required: true},
    published: {type: Boolean, default: true},
    publishedOn: {type: Date, default: Date.now},
},
{
    timestamps:true,
});

// Define Article Schema
const commentSchema = new mongoose.Schema({
    replies: String
}, {
    timestamps: true 
});

// Compile our Modle Based on the Schemas
const Article = mongoose.model('Article', articleSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Export our Models for the use
module.exports = {Article, Comment};