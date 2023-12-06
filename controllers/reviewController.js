const Review = require('../models/review');

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
    res.send('NOT IMPLEMENTED: createReview POST');
}

// update a review
exports.updateReview_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: updateReview GET');
}
exports.updateReview_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: updateReview POST');
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
