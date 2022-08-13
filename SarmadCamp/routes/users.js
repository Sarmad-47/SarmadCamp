const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

const user = require('../controllers/users');


router.route('/register')
    .get(user.registerForm)
    .post(catchAsync(user.registerUser))

router.route('/login')
    .get(user.LoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true }), user.LoginUser)

/**
 * requires callback now 
 * so must use this router function.
 */
router.get('/logout', user.LogoutUser);

module.exports = router;