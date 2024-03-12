const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const AppError = require('./utils/appError');
dotenv.config({ path: './config.env' });
const DB = require('./dataBase');
const globalErrorHandler = require('./middlewares/errorMiddleware');
const authRouter = require('./routes/authRoute');
const postRouter = require('./routes/postRoute');

const app = express();

app.use(express.json());

app.enable('trust proxy');

process.on('uncaughtException', (err) => {
  //if print variable without declare it
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(cors());
app.options('*', cors());

// app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
console.log('hello');
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

DB(process.env.DATA_BASE_URL);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App Running In Port ${PORT}`);
});
