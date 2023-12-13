const Review = require('../models/review');
const Book = require('../models/book');
const User = require('../models/user');

// get all reviews
exports.getAllReviews = async (req, res) => {
    res.send('NOT IMPLEMENTED: getAllReviews');
}

// get a review
exports.getReview = async (req, res) => {
   res.send('NOT IMPLEMENTED: getReview');
}

// create a review
exports.createReview_get = async (req, res) => {
   res.send('NOT IMPLEMENTED: createReview GET');
}
exports.createReview_post = async (req, res) => {
    const { content, rating } = req.body;
    const bookId = req.params.id;
    const userId = req.user._id;
    try {
        const newReview = await Review.create({
            content,
            rating,
            book: bookId,
            user: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        req.flash('success', 'Review created successfully');
        res.redirect(`/books/${bookId}`);
    } catch (err) {
        console.log(err);
        req.flash('error', 'Error creating review');
        res.redirect(`/books/${bookId}`);
    }
}

// update a review
exports.updateReview_get = async (req, res) => {
    const review = await Review.findById(req.params.id);
    res.render('book/updateReview', { review });
}

exports.updateReview_post = async (req, res) => {
    const review = await Review.findById(req.params.id).populate('book').populate('user');
    const bookId = review.book._id;
    if (review.user._id.toString() !== req.user._id.toString()) {
        req.flash('error', 'You are not authorized to do that!');
        return res.status(401).send('Unauthorized');
    }
    const { content, rating } = req.body;
    console.log(content);
    await Review.findByIdAndUpdate(req.params.id, {
        content,
        rating,
        updatedAt: new Date(),
    });
    req.flash('success', 'Review updated successfully!');
    res.redirect(`/books/${bookId}`);    
}

// delete a review
exports.deleteReview_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: deleteReview GET');
}
exports.deleteReview_post = async (req, res) => {
    // must be deleted by the user who created it
    const review = await Review.findById(req.params.id);
    if (review.user.toString() !== req.user._id.toString()) {
        req.flash('error', 'You are not authorized to do that!');
        return res.status(401).send('Unauthorized');
    }
    await Review.findByIdAndDelete(req.params.id);
    req.flash('success', 'Review deleted successfully!');
    // refresh the page
    res.redirect('back');
}
