var express = require('express');


const User = require('./models/user');
const Topic = require('./models/topic');
const SubTopic = require('./models/subTopic');
const Message = require('./models/message');

var app = express();

// Middleware to parse JSON bodies
app.use(express.json());

require ('./routes/user')(app, User, SubTopic, Message)
require ('./routes/topic')(app, Topic)
require ('./routes/subTopic')(app, Topic, SubTopic)
require ('./routes/message')(app, SubTopic, Message)

app.get('/', function(req, res) {

    res.send('Hello World');
})

app.get('/ping', function(req, res) {
    res.send('pong');
})


var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})