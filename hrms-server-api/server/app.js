import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import cors from "cors";
import connectMongo from "./connector/connectMongo.js";

var app = express();

// app.set('views', path.join(__dirname, '../public/views'));
// app.set('view engine', 'ejs');


connectMongo()

// app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json())
app.use(cors())
// Use the passport package in our application
// app.use(passport.initialize());
// app.use(passport.session());
// pass(passport)

app.use('/', indexRouter);

module.exports = app;
