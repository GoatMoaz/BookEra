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

// const seed = async () => {
//     await Book.deleteMany({});
//     await Author.deleteMany({});
//     await Publisher.deleteMany({});
//     await Category.deleteMany({});
//     await Review.deleteMany({});
//     await User.deleteMany({});
//
//     // create a user
//     const user = new User({
//         first_name: 'John',
//         last_name: 'Doe',
//         username: 'johndoe',
//         password: bcrypt.hashSync('password', 10),
//         wallet_amount: 10000,
//         type: 'buyer',
//         address: '123 Main St',
//     });
//
//     await user.save();
//
//     // another buyer
//     const buyer = new User({
//         first_name: 'Jane',
//         last_name: 'Doe',
//         username: 'janedoe',
//         password: bcrypt.hashSync('password', 10),
//         wallet_amount: 10000,
//         type: 'buyer',
//         address: '123 Main St',
//     });
//
//     await buyer.save();
//     // create an author
//     const author = new Author({
//         name: 'Hussein Hany',
//     });
//     await author.save();
//
//     // create a publisher
//     const publisher = new Publisher({
//         name: 'Pearson',
//     });
//
//     await publisher.save();
//
//     // create a category
//
//     const category = new Category({
//         name: 'Programming',
//     });
//
//     await category.save();
//
//     // create a book
//
//     const book = new Book({
//         title: 'Node.js in Action',
//         isbn: '9781617290572',
//         description:
//             'Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts youll need to build production-quality Node applications.',
//         authors: [author],
//         publisher,
//         price: 1000,
//         cover: 'https://images-na.ssl-images-amazon.com/images/I/51BQljdq9-L._SX379_BO1,204,203,200_.jpg',
//         categories: [category],
//         quantity: 10,
//         createdAt: new Date(),
//     });
//
//     await book.save();
//
//     // create a review
//     const review = new Review({
//         book,
//         user,
//         text: 'This is a great book!',
//         rating: 5,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     });
//
//     await review.save();
//
//     // create a seller
//     const seller = new Seller({
//         user,
//     });
//
//     await seller.save();
//
//
//     console.log('Database seeded');
//
//     process.exit();
// }
// seed database with sample data

// ... (existing imports and setup code)

const seed = async () => {
    // Clear existing data
    await Book.deleteMany({});
    await Author.deleteMany({});
    await Publisher.deleteMany({});
    await Category.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    await Seller.deleteMany({});
    await Buyer.deleteMany({});

    // Create users
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

    const sellerUser = new User({
        first_name: 'Sam',
        last_name: 'Seller',
        username: 'samseller',
        password: bcrypt.hashSync('password', 10),
        wallet_amount: 0,
        type: 'seller',
        address: '456 Market St',
    });
    await sellerUser.save();

    // Create authors
    const author1 = new Author({
        first_name: 'Hussein',
        last_name:'Hany',
    });
    await author1.save();

    const author2 = new Author({
        first_name: 'Jane',
        last_name:'Doe',
    });

    await author2.save();

    // Create publishers
    const publisher1 = new Publisher({
        name: 'Pearson',
    });
    await publisher1.save();

    const publisher2 = new Publisher({
        name: 'O\'Reilly Media',
    });
    await publisher2.save();

    // Create categories
    const category1 = new Category({
        name: 'Programming',
    });
    await category1.save();

    const category2 = new Category({
        name: 'Web Development',
    });
    await category2.save();

    const seller1 = new Seller({
        user: sellerUser,
    });
    await seller1.save();

    // Create books
    const book1 = new Book({
        title: 'Node.js in Action',
        isbn: '9781617290572',
        description: 'Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition.',
        authors: [author1],
        publisher: publisher1,
        price: 1000,
        cover: 'https://images.manning.com/360/480/resize/book/9/be0e700-8ac5-44b7-92fc-0a0d250969be/Cantelon-Node-2ed.png',
        categories: [category1],
        quantity: 10,
        createdAt: new Date(),
        seller:seller1,
    });
    await book1.save();

    const book2 = new Book({
        title: 'JavaScript: The Good Parts',
        isbn: '9780596517748',
        description: 'This authoritative book scrapes away these bad features to reveal a subset of JavaScript that’s more reliable, readable, and maintainable than the language as a whole.',
        authors: [author2],
        publisher: publisher2,
        price: 800,
        cover: 'https://m.media-amazon.com/images/I/81kqrwS1nNL._SY342_.jpg',
        categories: [category1, category2],
        quantity: 15,
        createdAt: new Date(),
        seller:seller1,
    });
    await book2.save();

    // Create reviews
    const review1 = new Review({
        book: book1,
        user: user,
        text: 'This is a great book!',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await review1.save();

    const review2 = new Review({
        book: book2,
        user: buyer,
        text: 'Highly recommended!',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await review2.save();


    console.log('Database seeded');
    process.exit();
}