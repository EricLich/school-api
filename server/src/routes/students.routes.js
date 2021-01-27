const express = require('express');
const studentsRouter = express.Router();
const studentCtrl = require('../controllers/students.controller');

//GET ALL
studentsRouter.get('/', studentCtrl.getStudents);
//GET ONE
studentsRouter.get('/:id', studentCtrl.getStudent);
//CREATE ONE
studentsRouter.post('/', studentCtrl.createStudent);
//EDIT ONE
studentsRouter.put('/:id', studentCtrl.editStudent);
//DELETE ONE
studentsRouter.delete('/:id', studentCtrl.deleteStudent);

module.exports = studentsRouter;