// import required modules
import express from 'express';
const router = express.Router();
import passport from '../config/Passport.js';
import User from '../models/User.js';
import crypto from 'crypto';

// Display login page on startup
router.get('/', (req, res) => {
    res.render('auth'); // Render auth.ejs
});

// Display registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// User Registration
router.post('/register', async (req, res) => {
    try {
        //check if user exists
        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).json({ message: "Email already in use." });
        }

        //set up user data/request body
        const { username, email, password } = req.body;

        // Generate salt
        const salt = crypto.randomBytes(16);

        // Hash password
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
            if (err) throw err;

            const user = new User({
                username,
                email,
                passwordSalt: salt.toString('base64'),
                password: hashedPassword.toString('base64')
            });

            await user.save();

            // Auto-login after registration
            req.login(user, (err) => {
                if (err) return res.redirect('/login');
                return res.redirect('/notes');
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error during registration. Please try again later.",
            error: err.message
        });
    }
});


//handle login post request
router.post('/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/'
}));

//add logout route
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

export default router;