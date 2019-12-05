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

// Compile our Modle Based on the Schema
const Article = mongoose.model('Article', articleSchema);

// Export our Model for the use
module.exports = Article;