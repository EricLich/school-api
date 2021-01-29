const express = require('express');
const courseCtrl = require('../controllers/Courses.controller');
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

//DELETE A STUDENT FROM COURSE
coursesRouter.delete('/delete-student/:course_id/:student_id', courseCtrl.deleteStudent);


//ADD TEACHERS TO COURSE
coursesRouter.post('/add-teacher/:course_id/', coursesCtrl.addTeacher);

//GET ALL TEACHERS FROM COURSE
coursesRouter.get('/get-teachers/:course_id', courseCtrl.getCourseTeachers);

//DELETE A TEACHER FROM COURSE
coursesRouter.delete('/delete-teacher/:course_id/:teacher_id', courseCtrl.deleteTeacher);


module.exports = coursesRouter;