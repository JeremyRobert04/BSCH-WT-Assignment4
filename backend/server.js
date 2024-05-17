var express = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var session = require('express-session');
var bcrypt = require('bcrypt');
const cors = require('cors');


const User = require('./models/user');
const Topic = require('./models/topic');
const SubTopic = require('./models/subTopic');
const Message = require('./models/message');

var app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize session Middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require ('./routes/auth')(app, User, bcrypt, passport)
require ('./routes/init')(User, bcrypt, passport, LocalStrategy)
require ('./routes/user')(app, User, SubTopic, Message)
require ('./routes/topic')(app, Topic, SubTopic)
require ('./routes/subTopic')(app, Topic, SubTopic, Message)
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