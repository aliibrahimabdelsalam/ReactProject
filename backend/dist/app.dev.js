"use strict";

var express = require('express');

var dotenv = require('dotenv');

var morgan = require('morgan');

var cookieParser = require('cookie-parser');

var cors = require('cors');

var helmet = require('helmet');

var AppError = require('./utils/appError');

dotenv.config({
  path: './config.env'
});

var DB = require('./dataBase');

var globalErrorHandler = require('./middlewares/errorMiddleware');

var authRouter = require('./routes/authRoute');

var postRouter = require('./routes/postRoute');

var app = express();
app.use(express.json());
app.enable('trust proxy');
process.on('uncaughtException', function (err) {
  //if print variable without declare it
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
app.use(cors());
app.options('*', cors()); // app.use(helmet());

app.use(express.json({
  limit: '10kb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10kb'
}));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("mode: ".concat(process.env.NODE_ENV));
}

console.log('hello');
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!"), 404));
});
app.use(globalErrorHandler);
DB(process.env.DATA_BASE_URL);
var PORT = 8000;
app.listen(PORT, function () {
  console.log("App Running In Port ".concat(PORT));
});
//# sourceMappingURL=app.dev.js.map
