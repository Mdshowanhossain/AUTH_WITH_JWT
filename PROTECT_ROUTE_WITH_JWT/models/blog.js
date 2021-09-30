const mongoose = require('mongoose');

const blog = new mongoose.Schema({

    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const BlogData = new mongoose.model('Blog', blog);

module.exports = BlogData;