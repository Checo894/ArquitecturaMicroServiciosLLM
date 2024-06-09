const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./db');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    return done(null, false, { message: 'Invalid email or password' });
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, { message: 'Invalid email or password' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};


// const LocalStrategy = require('passport-local').Strategy;
// const { User } = require('./db');

// module.exports = function(passport) {
//     passport.use(new LocalStrategy(
//         { usernameField: 'email' },
//         async (email, password, done) => {
//             try {
//                 const user = await User.findOne({ where: { email } });
//                 if (!user) {
//                     return done(null, false, { message: 'Invalid email or password' });
//                 }
//                 if (user.password !== password) { // Considera usar bcrypt para hashing de contraseñas
//                     return done(null, false, { message: 'Invalid email or password' });
//                 }
//                 return done(null, user);
//             } catch (err) {
//                 return done(err);
//             }
//         }
//     ));

//     passport.serializeUser((user, done) => {
//         done(null, user.id); // Serializa el ID del usuario
//     });

//     passport.deserializeUser(async (id, done) => {
//         try {
//             const user = await User.findByPk(id);
//             done(null, user);
//         } catch (err) {
//             done(err);
//         }
//     });
// };


// // const LocalStrategy = require('passport-local').Strategy;
// // const { User } = require('./db');

// // module.exports = function(passport) {
// //     passport.use(new LocalStrategy(
// //         { usernameField: 'email' },
// //         async (email, password, done) => {
// //             try {
// //                 const user = await User.findOne({ where: { email } });
// //                 if (!user) {
// //                     return done(null, false, { message: 'Invalid email or password' });
// //                 }
// //                 if (user.password !== password) { // Considera usar bcrypt para hashing de contraseñas
// //                     return done(null, false, { message: 'Invalid email or password' });
// //                 }
// //                 return done(null, user);
// //             } catch (err) {
// //                 return done(err);
// //             }
// //         }
// //     ));

// //     passport.serializeUser((user, done) => {
// //         done(null, user.id); // Asegúrate de que estás serializando el ID del usuario
// //     });

// //     passport.deserializeUser(async (id, done) => {
// //         try {
// //             const user = await User.findByPk(id);
// //             done(null, user);
// //         } catch (err) {
// //             done(err);
// //         }
// //     });
// // };


// // // const LocalStrategy = require('passport-local').Strategy;
// // // const { User } = require('./db');

// // // module.exports = function(passport) {
// // //     passport.use(new LocalStrategy(
// // //         { usernameField: 'email' },
// // //         async (email, password, done) => {
// // //             try {
// // //                 const user = await User.findOne({ where: { email } });
// // //                 if (!user) {
// // //                     return done(null, false, { message: 'Invalid email or password' });
// // //                 }
// // //                 if (user.password !== password) { // Considera usar bcrypt para hashing de contraseñas
// // //                     return done(null, false, { message: 'Invalid email or password' });
// // //                 }
// // //                 return done(null, user);
// // //             } catch (err) {
// // //                 return done(err);
// // //             }
// // //         }
// // //     ));

// // //     passport.serializeUser((user, done) => {
// // //         done(null, user.id); // Asegúrate de que estás serializando el ID del usuario
// // //     });

// // //     passport.deserializeUser(async (id, done) => {
// // //         try {
// // //             const user = await User.findByPk(id);
// // //             done(null, user);
// // //         } catch (err) {
// // //             done(err);
// // //         }
// // //     });
// // // };


// // // // const LocalStrategy = require('passport-local').Strategy;
// // // // const { User } = require('./db');

// // // // module.exports = function(passport) {
// // // //     passport.use(new LocalStrategy(
// // // //         { usernameField: 'email' },
// // // //         async (email, password, done) => {
// // // //             try {
// // // //                 const user = await User.findOne({ where: { email } });
// // // //                 if (!user) {
// // // //                     return done(null, false, { message: 'Invalid email or password' });
// // // //                 }
// // // //                 if (user.password !== password) { // Considera usar bcrypt para hashing de contraseñas
// // // //                     return done(null, false, { message: 'Invalid email or password' });
// // // //                 }
// // // //                 return done(null, user);
// // // //             } catch (err) {
// // // //                 return done(err);
// // // //             }
// // // //         }
// // // //     ));

// // // //     passport.serializeUser((user, done) => {
// // // //         done(null, user.id); // Asegúrate de que estás serializando el ID del usuario
// // // //     });

// // // //     passport.deserializeUser(async (id, done) => {
// // // //         try {
// // // //             const user = await User.findByPk(id);
// // // //             done(null, user);
// // // //         } catch (err) {
// // // //             done(err);
// // // //         }
// // // //     });
// // // // };



// // // // // const LocalStrategy = require('passport-local').Strategy;
// // // // // const { User } = require('./db');

// // // // // module.exports = function(passport) {
// // // // //     passport.use(new LocalStrategy(
// // // // //         { usernameField: 'email' },
// // // // //         async (email, password, done) => {
// // // // //             try {
// // // // //                 const user = await User.findOne({ where: { email } });
// // // // //                 if (!user) {
// // // // //                     return done(null, false, { message: 'Invalid email or password' });
// // // // //                 }
// // // // //                 if (user.password !== password) { // Considera usar bcrypt para hashing de contraseñas
// // // // //                     return done(null, false, { message: 'Invalid email or password' });
// // // // //                 }
// // // // //                 return done(null, user);
// // // // //             } catch (err) {
// // // // //                 return done(err);
// // // // //             }
// // // // //         }
// // // // //     ));

// // // // //     passport.serializeUser((user, done) => {
// // // // //         done(null, user.email);
// // // // //     });

// // // // //     passport.deserializeUser(async (email, done) => {
// // // // //         try {
// // // // //             const user = await User.findOne({ where: { email } });
// // // // //             done(null, user);
// // // // //         } catch (err) {
// // // // //             done(err);
// // // // //         }
// // // // //     });
// // // // // };


// // // // // // const LocalStrategy = require('passport-local').Strategy;
// // // // // // const { User } = require('./db');

// // // // // // module.exports = function(passport) {
// // // // // //     passport.use(new LocalStrategy(
// // // // // //         { usernameField: 'email' },
// // // // // //         async (email, password, done) => {
// // // // // //             try {
// // // // // //                 const user = await User.findOne({ where: { email } });
// // // // // //                 if (!user) {
// // // // // //                     return done(null, false, { message: 'Invalid email or password' });
// // // // // //                 }
// // // // // //                 if (user.password !== password) { // Considera usar bcrypt para hashing de contraseñas
// // // // // //                     return done(null, false, { message: 'Invalid email or password' });
// // // // // //                 }
// // // // // //                 return done(null, user);
// // // // // //             } catch (err) {
// // // // // //                 return done(err);
// // // // // //             }
// // // // // //         }
// // // // // //     ));

// // // // // //     passport.serializeUser((user, done) => {
// // // // // //         done(null, user.email);
// // // // // //     });

// // // // // //     passport.deserializeUser(async (email, done) => {
// // // // // //         try {
// // // // // //             const user = await User.findOne({ where: { email } });
// // // // // //             done(null, user);
// // // // // //         } catch (err) {
// // // // // //             done(err);
// // // // // //         }
// // // // // //     });
// // // // // // };
