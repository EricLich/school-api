const Course = require('../models/Course');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const { getStudent } = require('./students.controller');

const courseCtrl = {};

//BASIC CRUD

courseCtrl.getCourses = async (req, res) =>{
    try{
        const courses = await Course.find();
        if(!courses) return res.status(301).json({message: "No courses in the database"});
        return res.json(courses);
    }catch(err){
        console.log(err);
    }
}

courseCtrl.getCourse = async (req, res) =>{
    try{
        try{
            const course = await Course.findById(req.params.id);
            if(!course) return res.status(301).json({message: "course not found"});
            return res.json(course);
        }catch(err){
            console.log(err);
        }
    }catch(err){
        console.log(err);
    }
}

courseCtrl.createCourse = async (req, res) =>{
    try{
        const course = new Course(req.body);
        course.save()
              .then(course => res.json(`${course.courseName} added to db`))
              .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

courseCtrl.editCourse = async (req, res) =>{
    try{
        const course = await Course.findByIdAndUpdate(req.params.id, req.body)
                                      .then(course => res.json({message: `${course.courseName} updated in db`}))
                                      .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

courseCtrl.deleteCourse = async (req, res) =>{
    try{
        const course = await Course.findByIdAndDelete(req.params.id)
                                     .then(course => res.json({message: `${course.courseName} deleted from db`}))
                                     .catch(err => console.log(err));
    }catch(err){
        console.log(err);
    }
}

//WORKING WITH STUDENTS 
//ADD STUDENT TO COURSE
courseCtrl.addStudent = async (req, res) => {
    try{
        const course = await Course.findById(req.params.course_id);
        if(!course){
            return res.status(204).json({message: "Course does not exist"});  
        }else{
            if(course.courseStudents.length > 0){
                let i = 0;
                let added = false;
                while(i < course.courseStudents.length && !added){
                    if(course.courseStudents[i] == req.body.student_id){
                        res.json({message: "Student already added to course"});
                        added = true;
                    }else{
                        i++;
                    }
                }
                if(!added){
                    course.courseStudents.push(req.body.student_id);
                    course.save();
                    added = true;
                    res.send(course.courseStudents);
                }                
            }else{
                course.courseStudents.push(req.body.student_id);
                course.save();
                res.send(course.courseStudents);
            }
        } 
    }catch(err){
        console.log(err);
    }
}

//GET ALL STUDENTS FROM COURSE
courseCtrl.getCourseStudents = async (req, res) => {
    try{
        const course = await Course.findById(req.params.course_id);
        if(!course){
            return res.status(204).json({message: "Course does not exist"});  
        }else{
            let students = await getAllStudents(course);
            res.send(students);            
        }

    }catch(err){
        console.log(err);
    }
}

const getAllStudents = async (course) => {
    let students = [];
    if(course.courseStudents.length > 0){
        for(let student_id of course.courseStudents){
            let student = await Student.findById(student_id);
            students.push(student);
        }       
    }
    return students;
}


//WORKING WITH TEACHERS
courseCtrl.addTeacher = async (req, res) => {
    try{
        const course = await Course.findById(req.params.course_id);
        if(!course){
            return res.status(204).json({message: "Course does not exist"});  
        }else{
            if(course.courseTeachers.length > 0){
                let i = 0;
                let added = false;
                while(i < course.courseTeachers.length && !added){
                    if(course.courseTeachers[i] == req.body.teacher_id){
                        res.json({message: "Teacher already added to course"});
                        added = true;
                    }else{
                        course.courseTeachers.push(req.body.teacher_id);
                        course.save();
                        res.send(course.courseTeachers);
                    }
                    i++;
                }
            }else{
                course.courseTeachers.push(req.body.teacher_id);
                course.save();
                res.send(course.courseTeachers);
            }
        } 
    }catch(err){
        console.log(err);
    }
}


module.exports = courseCtrl;