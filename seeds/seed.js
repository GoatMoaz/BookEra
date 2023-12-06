// seed database with sample data

const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');
const Publisher = require('../models/publisher');
const Category = require('../models/category');
const Review = require('../models/review');
const User = require('../models/user');
const Seller = require('../models/seller');
const Buyer = require('../models/buyer');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const mongoDB = process.env.MONGODB_URL;


connectDB();
async function connectDB() {
    try {
        await mongoose.connect(mongoDB);
        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
    }
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
    console.log('Database connected');
    await seed();
});

const seed = async () => {
    // Clear existing data
    await Book.deleteMany({});
    await Author.deleteMany({});
    await Publisher.deleteMany({});
    await Category.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    // Create users
    const humanBeing = new User({
        first_name: 'Human',
        last_name: 'Being',
        username: 'humanbeing',
        password: bcrypt.hashSync('password', 10),
        wallet_amount: 10000,
        address: '123 Main St',
    });
    await humanBeing.save();

    const chicken = new User({
        first_name: 'Chick',
        last_name: 'The Chicken',
        username: 'chicken',
        password: bcrypt.hashSync('password', 10),
        wallet_amount: 10000,
        address: '456 Farm St',
    });
    await chicken.save();

    // Create authors
    const authorHumanBeing = new Author({
        first_name: 'Human',
        last_name:'Being',
    });
    await authorHumanBeing.save();

    const authorChicken = new Author({
        first_name: 'Chick',
        last_name:'The Chicken'
    });
    await authorChicken.save();

    // Create publishers
    const publisherHumanBeing = new Publisher({
        name: 'Human Being Publishing',
    });
    await publisherHumanBeing.save();

    const publisherChicken = new Publisher({
        name: 'Chicken Publishing',
    });
    await publisherChicken.save();

    // Create categories
    const categoryNodejs = new Category({
        name: 'Programming',
    });
    await categoryNodejs.save();

    const categoryChicken = new Category({
        name: 'Poultry',
    });
    await categoryChicken.save();

    // Create books
    const bookNodejs = new Book({
        title: 'Node.js in Action',
        isbn: '9781617290572',
        description: 'Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition.',
        authors: [authorHumanBeing],
        publisher: publisherHumanBeing,
        price: 1000,
        cover: 'https://images.manning.com/360/480/resize/book/9/be0e700-8ac5-44b7-92fc-0a0d250969be/Cantelon-Node-2ed.png',
        categories: [categoryNodejs],
        quantity: 10,
        createdAt: new Date(),
    });
    await bookNodejs.save();

    const bookChicken = new Book({
        title: 'All About Chickens',
        isbn: '9781593279509',
        description: 'A comprehensive guide to raising and caring for chickens.',
        authors: [authorChicken],
        publisher: publisherChicken,
        price: 800,
        cover: 'https://m.media-amazon.com/images/I/71-dQPtVFtL._SY466_.jpg',
        categories: [categoryChicken],
        quantity: 15,
        createdAt: new Date(),
    });
    await bookChicken.save();

    // Create reviews
    const reviewNodejs = new Review({
        book: bookNodejs,
        user: chicken,
        content: 'This book is clucking amazing!',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await reviewNodejs.save();

    const reviewChicken = new Review({
        book: bookChicken,
        user: humanBeing,
        content: 'A must-read for any chicken enthusiast!',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await reviewChicken.save();

    console.log('Database seeded');
    process.exit();
}
