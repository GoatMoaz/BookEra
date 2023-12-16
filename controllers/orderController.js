const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');
const mongoose = require('mongoose');
const Book = require('../models/book');
// Display list of all Orders.
exports.order_list = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('books');
        const user = await User.findById(req.user._id);

        let wallet_amount = user.wallet_amount;
        let total_price = 0;
        cart.books.forEach(book => {
            total_price += book.price;
        });

        // render checkout view
        res.render('checkout', { cart, total_price, wallet_amount });
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
};


// ...

// Handle Order create on POST.
exports.order_create_post = async (req, res) => {
    // Start a new session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log('Creating order')
        const cart = await Cart.findOne({ user: req.user._id }).populate('books');
        let total_price = 0;
        cart.books.forEach(book => {
            total_price += book.price;
        });

        const user = await User.findById(req.user._id);
        if (user.wallet_amount < total_price) {
            throw new Error('Insufficient funds in wallet');
        }

        // decrement the quantity of each book in the cart
        cart.books.forEach(async book => {
            book.quantity -= 1;
            await book.save({ session });
        });

        // for each seller in the cart, give them 97% of the total price of their books
        let sellers = [];
        cart.books.forEach(book => {
            if (!sellers.includes(book.seller)) {
                sellers.push(book.seller);
            }
        });

        sellers.forEach(async seller => {
            let seller_total = 0;
            cart.books.forEach(book => {
                if (book.seller.equals(seller)) {
                    seller_total += book.price;
                }
            });
            const seller_user = await User.findById(seller);
            seller_user.wallet_amount += seller_total * 0.97;

            // the 3% profit goes to the admin
            // not yet implemented

            await seller_user.save({session});
            }
        );


        // Create a new order
        const order = new Order({
            user: req.user._id,
            bought_books: cart.books,
            total_price: total_price,
            order_date: Date.now(),
        });

        // Clear the user's cart
        cart.books = [];
        await cart.save({ session });

        // Save the order
        await order.save({ session });

        // Deduct the total price of the order from the user's wallet
        user.wallet_amount -= total_price;
        await user.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // redirect to 'books' and display success message
        req.flash('success', 'Order placed successfully');
        res.redirect('/books');

    } catch (err) {
        // If an error occurred, abort the transaction
        await session.abortTransaction();
        session.endSession();

        console.log(err);
        res.status(500).json(err);
    }
};


// Display list of all books bought by the user.
exports.order_mybooks = async (req, res) => {
    try {
        let books;
        if (req.user.type === 'buyer') {
            const orders = await Order.find({ user: req.user._id }).populate('bought_books');
            books = orders.flatMap(order => order.bought_books);
        } else if (req.user.type === 'seller') {
            books = await Book.find({ seller: req.user._id });
        }

        // Loop over each book and populate
        books = await Promise.all(books.map(async (book) => {
            return await Book.populate(book, [
                {path: 'authors'},
                {path: 'publisher', select: 'name'},
                {path: 'categories', select: 'name'}
            ]);
        }));

        res.render('mybooks', {books: books});
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
};