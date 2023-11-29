const User = require('../models/user.js');

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get user by username
exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create user
exports.createUser_get = async (req, res) => {
    res.send('create user get');
}

exports.createUser_post = async (req, res) => {
    res.send('create user post');
}


// update user
exports.updateUser_get = async (req, res) => {
    res.send('update user get');
}

exports.updateUser_post = async (req, res) => {
    res.send('update user post');
}


// delete user
exports.deleteUser_get = async (req, res) => {
    res.send('delete user get');
}

exports.deleteUser_post = async (req, res) => {
    res.send('delete user post');
}

