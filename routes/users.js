const express = require('express');
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const { storeReturnTo } = require('../middleware')
const users = require('../controllers/users')


router.route('/register')
    //registrer form
    .get(users.renderRegister)
    //register logic
    .post(catchAsync(users.register))

router.route('/login')
    //login form
    .get(users.renderLogin)
    //login logic
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

//logout
router.get('/logout', users.logout);

module.exports = router;