const express = require('express');
const teachersRouter = express.Router();
const teacherCtrl = require('../controllers/teachers.controller');

//BASIC CRUD
//GET ALL
teachersRouter.get('/', teacherCtrl.getTeachers);
//GET ONE
teachersRouter.get('/:id', teacherCtrl.getTeacher);
//CREATE ONE
teachersRouter.post('/', teacherCtrl.createTeacher);
//EDIT ONE
teachersRouter.put('/:id', teacherCtrl.editTeacher);
//DELETE ONE
teachersRouter.delete('/:id', teacherCtrl.deleteTeacher);



module.exports = teachersRouter;