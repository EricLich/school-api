const express = require('express');
const coursesRouter = express.Router();
const coursesCtrl = require('../controllers/Courses.controller');

//BASIC CRUD

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

//ADDING STUDENTS AND TEACHERS
//ADD STUDENTS TO COURSE
coursesRouter.post('/add-student/:course_id/', coursesCtrl.addStudent);

//GET ALL STUDENTS FROM COURSE
coursesRouter.get('/get-students/:course_id', coursesCtrl.getCourseStudents);


//ADD TEACHERS TO COURSE
coursesRouter.post('/:course_id/add-teacher/', coursesCtrl.addTeacher);


module.exports = coursesRouter;