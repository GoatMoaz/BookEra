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


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {
    console.log('Database connected');
    await seed();
});

const seed = async () => {
    await Book.deleteMany({});
    await Author.deleteMany({});
    await Publisher.deleteMany({});
    await Category.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    // create a user
    const user = new User({
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        password: bcrypt.hashSync('password', 10),
        wallet_amount: 10000,
        type: 'buyer',
        address: '123 Main St',
    });

    await user.save();

    // another buyer
    const buyer = new User({
        first_name: 'Jane',
        last_name: 'Doe',
        username: 'janedoe',
        password: bcrypt.hashSync('password', 10),
        wallet_amount: 10000,
        type: 'buyer',
        address: '123 Main St',
    });

    await buyer.save();
    // create an author
    const author = new Author({
        name: 'Hussein Hany',
    });
    await author.save();

    // create a publisher
    const publisher = new Publisher({
        name: 'Pearson',
    });

    await publisher.save();

    // create a category

    const category = new Category({
        name: 'Programming',
    });

    await category.save();

    // create a book

    const book = new Book({
        title: 'Node.js in Action',
        isbn: '9781617290572',
        description:
            'Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts youll need to build production-quality Node applications.',
        authors: [author],
        publisher,
        price: 1000,
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51BQljdq9-L._SX379_BO1,204,203,200_.jpg',
        categories: [category],
        quantity: 10,
        createdAt: new Date(),
    });

    await book.save();

    // create a review
    const review = new Review({
        book,
        user,
        text: 'This is a great book!',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await review.save();

    // create a seller
    const seller = new Seller({
        user,
    });

    await seller.save();


    console.log('Database seeded');

    process.exit();
}
