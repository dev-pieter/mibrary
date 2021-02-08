const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/user')

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      user.save()
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: '512409493412-p8em5bgu9urlf0hg0gpn0qj7fssd9pis.apps.googleusercontent.com',
    clientSecret: 'EWpSsTx1DFRcHek4fKmfv57B',
    callbackURL: '/google/callback',
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id, name: profile.displayName, email: profile.email, accessToken: accessToken }, function (err, user) {
        return done(null, user);
    })  
  }
));
