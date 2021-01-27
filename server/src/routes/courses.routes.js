const express = require('express');
const coursesRouter = express.Router();
const coursesCtrl = require('../controllers/Courses.controller');

//GET ALL
coursesRouter.get('/', coursesCtrl.getCourses);
//GET ONE
coursesRouter.get('/:id', coursesCtrl.getCourse);
//CREATE ONE
coursesRouter.post('/', coursesCtrl.createCourse);
//EDIT ONE
coursesRouter.put('/:id', coursesCtrl.editCourse);
//DELETE ONE
coursesRouter.delete('/:id', coursesCtrl.deleteCourse);

module.exports = coursesRouter;