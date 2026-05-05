//Import required modules
import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

//Import routes
import authRouter from './routes/authRouter.js';
import notesRouter from './routes/notesRouter.js';

//Initialize Express app
const app = express();

//Define the port
const PORT = 
process.env.PORT || 3000;


// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware (must come BEFORE passport.session)
app.use(session({
    secret: 'supersecretkey',   // use env variable in real apps
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Make user available in all EJS views. This allows us to conditionally show login/logout links, etc.
app.use((req, res, next) => {
    res.locals.user = req.user; // makes user available in all EJS views
    next();
});

// set up Toast notifications middleware (using session to store messages)
app.use((req, res, next) => {
    res.locals.toast = req.session.toast;
    delete req.session.toast;
    next();
});

// Middleware for method override to support PUT and DELETE from forms
import methodOverride from 'method-override';
app.use(methodOverride('_method'));

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

//mount routes
app.use('/', authRouter); //display login page on startup
app.use('/notes', notesRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});