module.exports = function(app, User, SubTopic, Message) {
 
    // create a new message
    app.post('/message/create-message', async function(req, res) {
        const message = new Message(req.body);
        await message.save();
        res.send(message);
    });

    // Delete a message
    app.delete('/message/delete-message/:id', async function(req, res) {
        const message = await Message.findByPk(req.params.id);
        if (!message)
            return res.status(404).send('Message not found');
        else {
            await message.destroy();
            res.send(message);
        }
    });

    // Get all messages for a subtopic
    app.get('/message/get-messages/:id', async function(req, res) {
        const messages = await Message.findAll({where: {subTopicId: req.params.id}});
        
        // Sort messages by upvotes
        messages.sort((a, b) => b.upVotes - a.upVotes);
        
        for (let i = 0; i < messages.length; i++) {
            const user = await User.findByPk(messages[i].userId);
            messages[i].dataValues.pro = user.professional;
        }

        res.send(messages);
    });

    // Upvote a message
    app.put('/message/upvote/:id', async function(req, res) {
        const message = await Message.findByPk(req.params.id);
        if (!message)
            return res.status(404).send('Message not found');
        else {
            message.upVotes+=1;
            await message.save();
            res.send(message);
        }
    });
}