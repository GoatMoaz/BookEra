const Cart = require("../models/cart");


exports.addToCart = async function(req, res, next) {
    const userId = req.user._id;
    const bookId = req.params.id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId });
    }

    cart.books.push(bookId);
    await cart.save();
    req.flash('success', 'Book added to cart successfully');
    res.redirect('back');
};


// delete book from cart
exports.deleteFromCart = async function(req, res, next) {
    const userId = req.user._id;
    const bookId = req.params.id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId });
    }


    cart.books.pull(bookId);
    await cart.save();
    req.flash('success', 'Book removed from cart successfully');
    // refresh the page
    res.redirect('back');
};
