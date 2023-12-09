const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/about', function (req, res, next) {
    res.render('about', {title: 'Express'});
});

router.get('/cart', function (req, res, next) {
    let cart = req.session.cart || [];
    res.render('cart', { cart: cart });
});


module.exports = router;
