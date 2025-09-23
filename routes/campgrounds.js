const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, ValidateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    // index
    .get(catchAsync(campgrounds.index))
    //post campground
    .post(isLoggedIn, upload.array('image'), ValidateCampground, catchAsync(campgrounds.createCampground))

//new campground form (siempre debe estar antes del show route)
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    //show campground
    .get(catchAsync(campgrounds.showCampground))
    //post update campground
    .put(isLoggedIn, isAuthor, upload.array('image'), ValidateCampground, catchAsync(campgrounds.updateCampground))
    //delete
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

//edit campground form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;