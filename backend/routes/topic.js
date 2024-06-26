module.exports = function(app, Topic, SubTopic) { 

    // Create a Topic
    app.post('/topic/create-topic', async function(req, res) {
        const topic = new Topic(req.body);
        
        //Check if topic already exists
        const existingTopic = await Topic.findOne({where: {code: topic.code}});
        
        if (existingTopic)
            return res.status(400).send('Topic already exists');
        else {
            await topic.save();
            res.send(topic);
        }
    });

    // Delete a Topic
    app.delete('/topic/delete-topic/:id', async function(req, res) {
        const topic = await Topic.findByPk(req.params.id);
        
        if (!topic)
            return res.status(404).send('Topic not found');
        else {
            await topic.destroy();
            res.send(topic);
        }
    });


    // Get all Topics
    app.get('/topic/get-all-topics', async function(req, res) {
        const topics = await Topic.findAll();

        //get all subtopics for each topic
        for (let i = 0; i < topics.length; i++) {
            const subtopics = await SubTopic.findAll({where: {topicId: topics[i].id}});
            topics[i].setDataValue('subtopics', subtopics.length);
        }

        res.send(topics);
    });
}