#!/usr/bin/env node

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const keys = require('./key');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const port = process.env.PORT || 1983;
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});