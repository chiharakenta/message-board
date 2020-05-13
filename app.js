const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.user.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, user.password, (error, result) => {
          console.log(result);
          if(!result) {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  }
));

var session = require("express-session");
var bodyParser = require("body-parser");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static("public"));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const db = require('./models/index');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.user.findByPk(id)
    .then((results) => {
      done(null, results);
    }, (error) => {
      done(error, null);
    });
});

// settings for method-override
var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// routing
app.get('/', (req, res) => {
  res.redirect('/messages');
});

const sessionsRouter = require('./routes/sessions');
const messagesRouter = require('./routes/messages');
const repliesRouter = require('./routes/replies');
const usersRouter = require('./routes/users');
app.use('/', sessionsRouter);
app.use('/messages', messagesRouter);
app.use('/replies', repliesRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;