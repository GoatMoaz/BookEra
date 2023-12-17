const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/:id/create', reviewController.createReview_post);

// update a review
router.get('/:id/update', reviewController.updateReview_get);
router.post('/:id/update', reviewController.updateReview_post);

router.post('/:id/delete', reviewController.deleteReview_post);

module.exports = router;