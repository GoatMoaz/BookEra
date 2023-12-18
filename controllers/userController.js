const User = require('../models/user.js');
const Book = require('../models/book.js');
const Review = require('../models/review.js');
const Order = require('../models/order.js');
const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// get user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // render the user profile page
        res.render('user_profile', { user });
    } catch (err) {
        res.status(500).json(err);
    }
};

// create user
exports.signup_get = async (req, res) => {
    res.render('signup_form');
};

exports.signup_post = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            username: req.body.username,
        });
        if (existingUser) {
            req.flash('error', 'Username already exists');
            return res.redirect('/users/signup');
        }
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            wallet_amount: 0,
            gender: req.body.gender,
            type: req.body.type,
        });
        await user.save();
        res.redirect('/users/login');
    } catch (err) {
        req.flash('error', 'An error occurred');
        res.redirect('/users/signup');
    }
};

// update user
exports.updateUser_get = async (req, res) => {
    res.render('update_user_profile');
};

exports.updateUser_post = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.wallet_amount = req.body.wallet_amount || user.wallet_amount;
        await user.save();
        req.flash('success', 'User updated successfully');
        res.redirect(`/users/${user._id}`);
    } catch (err) {
        req.flash('error', 'An error occurred');
        res.status(500).json(err);
    }
};

exports.deleteUser_post = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findById(req.params.id).session(session);
        const books = await Book.find({ seller: user._id }).session(session);
        const reviews = await Review.find({ user: user._id }).session(session);
        const Orders = await Order.find({ user: user._id }).session(session);

        const deleteReviews = reviews.map((review) =>
            Review.deleteOne({ _id: review._id }).session(session),
        );
        const deleteBooks = books.map((book) =>
            Book.deleteOne({ _id: book._id }).session(session),
        );
        const deleteOrders = Orders.map((order) =>
            Order.deleteOne({ _id: order._id }).session(session),
        );

        await Promise.all([...deleteReviews, ...deleteBooks, ...deleteOrders]);

        await User.deleteOne({ _id: req.params.id }).session(session);

        await session.commitTransaction();

        req.flash('success', 'User deleted successfully');
        req.logout((err) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/');
        });
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        req.flash('error', 'An error occurred');
        res.status(500).json(err);
    } finally {
        session.endSession();
    }
};

// user login
exports.login_get = async (req, res) => {
    res.render('login_form');
};

exports.login_post = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/users/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            // If login is successful, initialize an empty cart in the session
            req.session.cart = [];
            return res.redirect('/');
        });
    })(req, res, next);
};

// user logout
exports.logout_get = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.redirect('/');
    });
};

// change password
exports.changePassword_get = async (req, res) => {
    res.render('change_password');
};
exports.changePassword_post = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const match = await bcrypt.compare(
            req.body.old_password,
            user.password,
        );
        if (!match) {
            req.flash('error', 'Incorrect password');
            return res.redirect('/users/change-password');
        }
        user.password = bcrypt.hashSync(req.body.new_password, 10);
        await user.save();
        req.flash('success', 'Password changed successfully');
        req.logout((err) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect('/users/login');
        });
    } catch (err) {
        req.flash('error', 'An error occurred');
        res.status(500).json(err);
    }
};
