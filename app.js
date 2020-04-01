const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/bookRoutes');
var adminRouter = require('./routes/adminRouter');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    name: "C4Projects",
    resave: true,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/books", bookRouter);
app.use("/admin", adminRouter);
// catch 404 and forward to error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// Database Connections
const MongoDataBase = process.env.MONGO_URl ||"mongodb://localhost:27017/lms";
mongoose.connect(MongoDataBase,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Database Connection to lms ");
    });

//for  deprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// error handler


module.exports = app;
