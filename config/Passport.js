import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';
import crypto from 'crypto';

passport.use(new LocalStrategy(
    { usernameField: 'email' },   // <-- IMPORTANT, tells Passport to use 'email' instead of 'username'
    async function verify(email, password, cb) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return cb(null, false, { message: 'Incorrect email.' });
            }

            crypto.pbkdf2(
                password,
                Buffer.from(user.passwordSalt, 'base64'),
                310000,
                32,
                'sha256',
                function (err, hashedPassword) {
                    if (err) return cb(err);

                    const storedHash = Buffer.from(user.password, 'base64');

                    // Compare hashes safely
                    if (!crypto.timingSafeEqual(storedHash, hashedPassword)) {
                        return cb(null, false, { message: 'Incorrect password.' });
                    }

                    return cb(null, user);
                }
            );

        } catch (err) {
            return cb(err);
        }
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id);
        cb(null, user);
    } catch (err) {
        cb(err);
    }
});

export default passport;