const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })


const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

/**
 * We can do chain routes.
 * Group all similar together
 * Lines of code gets minimum.
 */

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


// populate the authors that have given reviews
// then populate that author who is logged in and making any review


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground));





module.exports = router;