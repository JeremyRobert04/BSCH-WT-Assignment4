var express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");

const User = require("./models/user");
const Topic = require("./models/topic");
const SubTopic = require("./models/subTopic");
const Message = require("./models/message");

var app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: "GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE",
    exposedHeaders: ["Content-Disposition"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize session Middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use("/public/", express.static(path.resolve(__dirname, "./public")));

require("./routes/auth")(app, User, bcrypt, passport);
require("./routes/init")(User, bcrypt, passport, LocalStrategy);
require("./routes/user")(app, User, SubTopic, Message);
require("./routes/topic")(app, Topic, SubTopic);
require("./routes/subTopic")(app, User, Topic, SubTopic, Message);
require("./routes/message")(app, User, SubTopic, Message);

// host Angular app
//app.use(express.static(path.join(__dirname, "./frontend/browser")));
//
//app.get("*", (req, res) => {
//  res.sendFile(path.join(__dirname, "./frontend/browser/index.html"));
//});

var server = app.listen(8080, function () {
  console.log("Backend Application listening at http://localhost:8080");
});
