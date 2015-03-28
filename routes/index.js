module.exports = function (app, io, passport) {
    app.route('/login')
        .get(function (req, res, next) {
            res.render('login', {title: 'web chat app'});
        })
        .post();

    app.route('/' )
        .get(isLoggedIn, function(req, res, next) {
            console.log('user ***: ', req.user);
            res.render('../public/build/index', {
                user : req.user // get the user out of session and pass to template
            });
        });

    app.route('/me')
        .get(isLoggedIn, function (req, res, next) {
            res.send(req.user);
        });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/login'
    }));

    app.get('/auth/facebook/callback', function (req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/');
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send('ok');
            });
        })(req, res, next);
    })

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}