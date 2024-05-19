module.exports = function(app, User, Topic, SubTopic, Message) { 

    // Create a new subtopic
    app.post('/subtopic/create-subtopic', async function(req, res) {
        const subTopic = new SubTopic(req.body);
        
        //Check if subtopic already exists
        const existingSubTopic = await SubTopic.findOne({where: {name: subTopic.name}});
        
        if (existingSubTopic)
            return res.status(400).send('Subtopic already exists');
        else {
            await subTopic.save();
            res.send(subTopic);
        }
    });

    // Delete a subtopic
    app.delete('/subtopic/delete-subtopic/:id', async function(req, res) {
        const subTopic = await SubTopic.findByPk(req.params.id);
        if (!subTopic)
            return res.status(404).send('Subtopic not found');
        else {
            await subTopic.destroy();
            res.send(subTopic);
        }
    });

    // Get all subtopics for a topic
    app.get('/subtopic/get-subtopics/:id', async function(req, res) {
        const subTopics = await SubTopic.findAll({where: {topicId: req.params.id}});

        //get all messages for each subtopic
        for (let i = 0; i < subTopics.length; i++) {
            const messages = await Message.findAll({where: {subTopicId: subTopics[i].id}});
            subTopics[i].setDataValue('messages', messages.length);
        }

        //sort subtopics by creation date
        subTopics.sort((a, b) => b.createdAt - a.createdAt);

        res.send(subTopics);
    });

    // Get all subtopics
    app.get('/subtopic/get-all-subtopics', async function(req, res) {
        const subTopics = await SubTopic.findAll();

        //get all messages for each subtopic
        for (let i = 0; i < subTopics.length; i++) {
            const messages = await Message.findAll({where: {subTopicId: subTopics[i].id}});
            subTopics[i].setDataValue('messages', messages.length);
        }

        //sort subtopics by creation date
        subTopics.sort((a, b) => b.createdAt - a.createdAt);

        res.send(subTopics);
    });

    // Get last three subtopics
    app.get('/subtopic/get-last-three-subtopics', async function(req, res) {
        const subTopics = await SubTopic.findAll();

        const lastSubtopics = subTopics.slice(Math.max(subTopics.length - 3, 0));

        for (let i = 0; i < lastSubtopics.length; i++) {
            const topic = await Topic.findByPk(lastSubtopics[i].topicId);
            lastSubtopics[i].setDataValue('topic', topic.name);
            const messages = await Message.findAll({where: {subTopicId: lastSubtopics[i].id}});
            lastSubtopics[i].setDataValue('messages', messages.length);
        }

        lastSubtopics.sort((a, b) => b.createdAt - a.createdAt);

        res.send(lastSubtopics);
    });

    // Get a subtopic by id and all messages for that subtopic and user info for each message
    app.get('/subtopic/get-subtopic/:id', async function(req, res) {
        const subTopic = await SubTopic.findByPk(req.params.id);

        if (!subTopic)
            return res.status(404).send('Subtopic not found');
        else {
            const messages = await Message.findAll({where: {subTopicId: subTopic.id}});

            for (let i = 0; i < messages.length; i++) {
                const user = await User.findByPk(messages[i].userId);
                messages[i].setDataValue('user', user);
            }

            res.send(messages);
        }
    });
}