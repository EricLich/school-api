const Teacher = require('../models/Teacher');

const teacherCtrl = {};

teacherCtrl.getTeachers = async (req, res) =>{
    try{
        const teachers = await Teacher.find();
        if(!teachers) return res.status(301).json({message: "No teachers in the database"});
        return res.json(teachers);
    }catch(err){
        console.log(err);
    }
}

teacherCtrl.getTeacher = async (req, res) =>{
    try{
        const teacher = await Teacher.findById(req.params.id);
        if(!teacher) return res.status(301).json({message: "teacher not found"});
        return res.json(teacher);
    }catch(err){
        console.log(err);
    }
}

teacherCtrl.createTeacher = async (req, res) =>{
    try{
        try{
            const teacher = new Teacher(req.body);
            await teacher.save()
                         .then(teacher => res.send(`${teacher.name} ${teacher.lastName} added to db`))
                         .catch(err => console.log(err));
        }catch(err){
            console.log(err);
        }
    }catch(err){
        console.log(err);
    }
}

teacherCtrl.editTeacher = async (req, res) =>{
    try{
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body)
                                      .then(teacher => res.json({message: `${teacher.name} updated in db`}))
                                      .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

teacherCtrl.deleteTeacher = async (req, res) =>{
    try{
        const teacher = await Teacher.findByIdAndDelete(req.params.id)
                                     .then(teacher => res.json({message: `${teacher.name} deleted from db`}))
                                     .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}


module.exports = teacherCtrl;