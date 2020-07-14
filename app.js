const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    bookRouter = require('./routes/bookRoutes'),
    bookRouterAPI = require('./routes/bookRoutesAPI');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'test'){
   app.use(logger('dev'));
   adminRouter = require('./routes/adminRouter');
   app.use("/admin", adminRouter);
}

// Database Connections
const MongoDataBase = process.env.MONGO_URl || "mongodb://localhost:27017/lms";
mongoose.connect(MongoDataBase,{
    useNewUrlParser: true,
    useUnifiedTopology: true}
    // ,() => {
    //     console.log("Database Connection to lms ")
    // }
    );

//for  deprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
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
app.use("/api/books", bookRouterAPI);


// error handler
// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
