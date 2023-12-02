const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const RateLimit = require('express-rate-limit');

// use .env
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');
const orderDetailsRouter = require('./routes/orders_detail');
const categoryRouter = require('./routes/categories');
const reviewRouter = require('./routes/reviews');

const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
});


const mongoose = require('mongoose');
const session = require('express-session');
const mongoDB = process.env.MONGODB_URL;
const SECRET = process.env.SECRET;
connectDB();

async function connectDB() {
    try {
        await mongoose.connect(mongoDB);
        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
    }
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: SECRET, resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/orders', ordersRouter);
app.use('/orders_detail', orderDetailsRouter);
app.use('/categories', categoryRouter);
app.use('/reviews', reviewRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
