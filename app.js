var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
const MemoryStore = require('session-memory-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var superusersRouter = require('./routes/superusers');
var kategoriRouter = require('./routes/kategori');
var menuRouter = require('./routes/menu');
var outletRouter = require('./routes/outlet');
var serviceRouter = require('./routes/service');
var pembayaranRouter = require('./routes/pembayaran');
var contactRouter = require('./routes/contact');
var syaratRouter = require('./routes/syarat_ketentuan');
var privasiRouter = require('./routes/kebijakan_privasi');
var perusahaanRouter = require('./routes/perusahaan')
var pemesananRouter = require('./routes/pemesanan')

//var pemesananRouter = require('./routes/pemesanan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {
    maxAge: 6000000000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  },
  store: new MemoryStore,
  saveUninitialized: true,
  resave: 'false',
  secret: 'secret'
}))

app.use(flash())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/superusers', superusersRouter);
app.use('/kategori', kategoriRouter);
app.use('/menu', menuRouter);
app.use('/outlet', outletRouter);
app.use('/service', serviceRouter);
app.use('/pembayaran', pembayaranRouter);
app.use('/contact', contactRouter);
app.use('/syarat_ketentuan', syaratRouter);
app.use('/kebijakan_privasi', privasiRouter);
app.use('/perusahaan', perusahaanRouter);
app.use('/pemesanan', pemesananRouter);
//app.use('/pemesanan', pemesananRouter);   


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
