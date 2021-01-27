const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const studentsRouter = require('./routes/students.routes');
const teachersRouter = require('./routes/teachers.routes');
const coursesRouter = require('./routes/courses.routes');

const app = express();

const PORT = process.env.PORT || 4000;

app.set('port', PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//ROUTES
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/courses', coursesRouter);

module.exports = app;