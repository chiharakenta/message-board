var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const db = require('./models/index');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  db.user.findByPk(id)
  .then(function(user) {
    done(null, user)
  })
  .catch(function(error) {
    done(error, null)
  });
});

passport.use(new LocalStrategy(
  function(name, password, done) {
    db.user.findOne({
      where: {
        name: name
      }
    })
    .then(function(user) {
      console.log(user);

      if (!user) {
        return done(null, false, { message: '入力された名前のユーザーは存在しません。' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'パスワードが一致しません。' });
      }
      return done(null, user);
    })
    .catch(function(err) {
      if (err) { return done(err); }
    });
  }
));

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
  return res.redirect('/messages');
});

const messagesRouter = require('./routes/messages');
const repliesRouter = require('./routes/replies');
app.use('/messages', messagesRouter);
app.use('/replies', repliesRouter);

app.get('/signup', function(req, res) {
  res.render('users/signup');
});

app.post('/signup', function(req, res) {
  const values = {
    name: req.body.name,
    password: req.body.password
  };
  db.user.create(values).then(function(results) {
    res.redirect('/messages');
  });
});

app.get('/signin', function(req, res) {
  res.render('users/signin');
});

app.post('/signin', passport.authenticate('local', {
  successRedirect: '/messages',
  failureRedirect: '/signin'
}));

app.delete('/signout', function(req, res) {
  req.logout();
  res.redirect('/signin');
});

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
