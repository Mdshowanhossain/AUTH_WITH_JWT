const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
    },
    date: {
        type: Date,
        default: Date.now(),
    }

});

module.exports = todoSchema;


// title: {
//     type: string,
//     required: true,
// },

// description: string,


// status: {
//     type: string,
//     enum: ["active", "inactive"],
// },
// date: {
//     type: Date,
//     default: Date.now(),
// },