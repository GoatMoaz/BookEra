const User = require('../models/user.js');
// require passport for authentication
const passport = require('passport');
// require passport-local strategy
const LocalStrategy = require('passport-local').Strategy;
// require bcrypt for password hashing
const bcrypt = require('bcrypt');



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
exports.signup_get = async (req, res) => {
    res.send('create user get');
}

exports.signup_post = async (req, res) => {
    // create a user and hash the password
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        wallet_amount: 10000,
        type: 'buyer',
        address: req.body.address,
    });

    try {
        // save the user
        const newUser = await user.save();
        // redirect to login page
        res.redirect('/users/login');
    } catch (err) {
        res.status(500).json(err);
    }
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


// user login
exports.login_get = async (req, res) => {
    res.send('login get form');
}

exports.login_post = async (req, res) => {

}
