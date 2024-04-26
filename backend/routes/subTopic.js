module.exports = function(app, Topic, SubTopic) { 

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
        res.send(subTopics);
    });
}