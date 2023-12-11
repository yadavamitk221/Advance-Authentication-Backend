// Import required modules
const express = require('express');
const cors = require('cors');
const session = require('express-session');

// Initialize Express app
const app = express();
const port = 8080;

// Import database configuration
const db = require("./config/mongoose");
   
// Import Passport configurations
const passport = require('./config/passport-local');
const passportJWT = require('./config/passport-jwt');

// Import routes
const routes = require('./Routers/index');

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors({       
    origin: true,
    credentials: true 
}));

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport authentication
app.use(passport.initialize());
app.use(passport.session()); 

// Route handling
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
