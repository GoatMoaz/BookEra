const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// get all reviews
router.get('/', reviewController.getAllReviews);


// create a review
router.get('/create', reviewController.createReview_get);
router.post('/create', reviewController.createReview_post);

// update a review
router.get('/:id/update', reviewController.updateReview_get);
router.post('/:id/update', reviewController.updateReview_post);

// delete a review
router.get('/:id/delete', reviewController.deleteReview_get);
router.post('/:id/delete', reviewController.deleteReview_post);

// get a review
router.get('/:id', reviewController.getReview);

module.exports = router;