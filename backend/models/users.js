const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const users = mongoose.model('users', usersSchema);

module.exports = users;