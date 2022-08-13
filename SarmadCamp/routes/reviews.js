const express = require('express');
/**
 * if we are using more params then we need to set mergeparmas as true
 * will give us error if more than one params. 
 * that is why we used mergeParmas as true.
 */
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviews = require('../controllers/reviews');


// Reviews model
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

/**
 * Deleting review in the campground 
 * Removing the review itself. 
 
 */

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;