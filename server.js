// DEPENDENCIES
var express = require("express");
var http = require("http");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./src/models/User');
var cors = require('cors');
var axios = require('axios');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();

// ROUTES
var api= require('./src/routes/index');

// APP
var app = express();

// PORT
var port = process.env.PORT || 5000;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// PASSPORT AND SESSIONS
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//passport.use(new LocalStrategy(User.authenticate()));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// SET VIEW LOCATION AND ENGINE
app.set('views', './src/views')
app.set('view engine', 'pug');

// SERVER
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

// USAGE OF ROUTES
app.use(api);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    return next();
});


var mongoDB = 'mongodb://wcuser:7FGsha!9R3pE4Ui@ds139781.mlab.com:39781/worldcup'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



