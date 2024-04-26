module.exports = function(app, User, SubTopic, Message) { 

    // Create a new user
    app.post('/user/create-user', async function(req, res) {
        const user = new User(req.body);
        
        //Check if user already exists
        const existingUser = await User.findOne({where: {email: user.email}});
        
        if (existingUser)
            return res.status(400).send('User already exists');
        else {
            await user.save();
            res.send(user);
        }
    });

    // Delete a user
    app.delete('/user/delete-user/:id', async function(req, res) {
        const user = await User.findByPk(req.params.id);
        if (!user)
            return res.status(404).send('User not found');
        else {
            await user.destroy();
            res.send(user);
        }
    });
}