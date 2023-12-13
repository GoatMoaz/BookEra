const Cart = require("../models/cart");


exports.addToCart = async function(req, res, next) {
    const userId = req.user._id;
    const bookId = req.params.id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId });
    }

    console.log(cart);

    cart.books.push(bookId);
    await cart.save();

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

    // refresh the page
    res.redirect('back');
};
