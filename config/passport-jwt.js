const passport = require("passport");
const User = require("../models/User");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRET_KEY",
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })  
      .catch((err) => {
        return done(err, false);
      });
  })
);

passport.checkAuthentication = passport.authenticate("jwt", { session: false });

module.exports = passport;
