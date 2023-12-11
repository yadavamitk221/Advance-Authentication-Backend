// Passport Strategies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jwt for token generation

const User = require("../models/User");

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Import sanitizeUser function if not already imported
        const token = jwt.sign(user.id, "SECRET_KEY");
        done(null, { id: user.id, role: user.role, token });
      } else {
        return done(null, false, { message: "Invalid credentials" });
      }
    } catch (err) {
      // Handle errors here
      console.error(err); // Log errors with console.error
      done(err);
    }
  })
);

// Serialize user to store in the session
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id);
    cb(null, { id: user.id, role: user.role });
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;
