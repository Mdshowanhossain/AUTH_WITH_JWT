const mongoose = require('mongoose');

const registration = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const Registration = new mongoose.model('Registration', registration);

module.exports = Registration;
