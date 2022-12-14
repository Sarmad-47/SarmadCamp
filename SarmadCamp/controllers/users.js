const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('users/register');
};


module.exports.registerUser = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        /**
         * must call login request when user is registered successfully.
         */
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })


    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');

    }


};

module.exports.LoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.LoginUser = (req, res) => {

    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.LogoutUser = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });
};