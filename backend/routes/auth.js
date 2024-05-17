module.exports = function(app, User, bcrypt, passport) {

    app.post('/register', async (req, res) => {
        const { firstName, lastName, email, password, professional, verified } = req.body;

        const user = await User.findOne({ where: { email } });

        if (user)
            return res.status(400).json({ message: 'User already exists' });

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                professional,
                verified
            });
    
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    app.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized', info });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Login failed' });
                }
                return res.json({ message: 'Logged in successfully' });
            });
        })(req, res, next);
    });
    
    app.post('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.json({ message: 'Logged out successfully' });
        });
    });
}