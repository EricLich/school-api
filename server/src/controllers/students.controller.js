const Student = require('../models/Student');

const studentCtrl = {};

studentCtrl.getStudents = async (req, res) =>{
    try{
        const students = await Student.find();
        if(!students) return res.status(301).json({message: "No students in the database"});
        return res.json(students);
    }catch(err){
        console.log(err);
    }
}

studentCtrl.getStudent = async (req, res) =>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(301).json({message: "Student not found"});
        return res.json(student);
    }catch(err){
        console.log(err);
    }
}

studentCtrl.createStudent = async (req, res) =>{
    try{
        const student = new Student(req.body);
        await student.save()
                     .then(student => res.send(`${student.name} ${student.lastName} added to db`))
                     .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

studentCtrl.editStudent = async (req, res) =>{
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body)
                                      .then(student => res.json({message: `${student.name} updated in db`}))
                                      .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

studentCtrl.deleteStudent = async (req, res) =>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id)
                                     .then(student => res.json({message: `${student.name} deleted from db`}))
                                     .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}


module.exports = studentCtrl;
