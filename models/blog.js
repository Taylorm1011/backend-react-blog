const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    Blog: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

module.exports = mongoose.model('Blog', blogSchema)