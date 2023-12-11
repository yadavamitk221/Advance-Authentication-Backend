const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "SECRET_KEY";
const bcrypt = require("bcrypt");

// Create a new user with hashed password and return a JWT upon successful registration
exports.createUser = async (req, res) => {
  try {
    const saltRounds = 10;

    // Generate a salt and hash the password asynchronously
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user instance with hashed password
    const user = new User({ ...req.body, password: hashedPassword });

    // Save the user to the database
    const savedUser = await user.save();

    // Log in the user and generate a JWT
    try {
      await new Promise((resolve, reject) => {
        req.login(savedUser, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Sign a JWT with the user ID and the secret key
      const token = jwt.sign({ id: savedUser.id }, JWT_SECRET_KEY);

      // Respond with user details and token
      res.status(201).json({ id: savedUser.id, role: savedUser.role, token });
    } catch (loginError) {
      res.status(400).json({ error: "Login error", details: loginError });
    }
  } catch (registrationError) {
    // Handle registration errors
    res.status(400).json({ error: "Registration error", details: registrationError });
  }
};

// Sign in a user and return a JWT upon successful authentication
exports.signin = async (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);

  // Respond with user details and token
  res.status(201).json({ id: user.id, role: user.role, token });
};

// Log out the user
exports.logout = async (req, res) => {
  req.logout();
  res.json({ success: true, message: 'User logged out successfully' });
};
