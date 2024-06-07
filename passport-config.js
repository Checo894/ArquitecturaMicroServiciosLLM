const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./db');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        { username: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    return done(null, false, { message: 'Invalid email or password' });
                }
                if (user.password !== password) { // Considera usar bcrypt para hashing de contraseñas
                    return done(null, false, { message: 'Invalid email or password' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        try {
            const user = await User.findOne({ where: { email } });
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
