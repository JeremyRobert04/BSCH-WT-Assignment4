module.exports = function(User, bcrypt, passport, LocalStrategy) {
    
    passport.serializeUser((user, done) => {
        done(null, user.userId);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
    
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                console.log('User not found');
                return done(null, false, { message: 'Incorrect email.' });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                console.log('Incorrect password');
                return done(null, false, { message: 'Incorrect password.' });
            }
            
            return done(null, user);
        } catch (err) {
            console.log('Error during authentication', err);
            return done(err);
        }
    }));
}