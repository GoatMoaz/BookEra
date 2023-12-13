const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');

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

