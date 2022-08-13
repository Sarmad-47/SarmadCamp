const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created a new Review');
    res.redirect(`/campgrounds/${campground._id}`)
};

module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    /**
     * first find the id. 
     * if id is found from reviews.
     * then delete it
     * pull is used to retrive the review and delete. 
     */
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted a review');
    res.redirect(`/campgrounds/${id}`);
};