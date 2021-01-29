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



////////////////////////////////////////////////
/////////// WORKING WITH STUDENTS /////////////
//////////////////////////////////////////////

//ADD STUDENT TO COURSE
courseCtrl.addStudent = async (req, res) => {
    try{
        const course = await Course.findById(req.params.course_id);
        if(!course){
            return res.status(204).json({message: "Course does not exist"});  
        }else{
            if(course.courseStudents.length > 0){
                const findStudent = (student_id, index) =>{
                    return student_id == course.courseStudents[index];
                }              
                
                if(course.courseStudents.findIndex(findStudent) == -1){
                    course.courseStudents.push(req.body.student_id);
                    course.save();
                    res.send(course.courseStudents);
                }else{
                    return res.json({message: "Student already added to course"});
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

//DELETE STUDENT FROM COURSE
courseCtrl.deleteStudent = async (req, res) => {
    try{
        const course = await Course.findById(req.params.course_id);
        if(!course) return res.status(204).json({message: "Course does not exist"});
        if(course.courseStudents.length > 0){
    
            const findStudent = (student_id, index) =>{
                return student_id == course.courseStudents[index];
            }      
            
            const studentIndex = course.courseStudents.findIndex(findStudent);
            
            if(studentIndex > -1){
                course.courseStudents.splice(studentIndex, 1);
                course.save();
                return res.json({message: "Student deleted"});
            }else{
                return res.json({message: "Student not found"});
            }
        }else{
            return res.json({message: "No students in this course"});
        }
    }catch(err){
        console.log(err);
    }
}


////////////////////////////////////////////////
/////////// WORKING WITH TEACHERS /////////////
//////////////////////////////////////////////

//ADD TEACHER TO COURSE
courseCtrl.addTeacher = async (req, res) => {
    try{
        const course = await Course.findById(req.params.course_id);
        if(!course){
            return res.status(204).json({message: "Course does not exist"});  
        }else{
            if(course.courseTeachers.length > 0){                
                const findTeacher = (teacher_id, index) => {
                    return course.courseTeachers[index] == teacher_id;
                } 
                if(course.courseTeachers.findIndex(findTeacher) > -1){
                    return res.json({message: "Teacher already added to course"});
                }else{
                    course.courseTeachers.push(req.body.teacher_id);
                    course.save();
                    res.json({message: `Teacher with id ${req.body.teacher_id} added to course`});
                }
            }else{
                course.courseTeachers.push(req.body.teacher_id);
                course.save();
                res.json({message: `Teacher with id ${req.body.teacher_id} added to course`});
            }
        } 
    }catch(err){
        console.log(err);
    }
}

//GET ALL TEACHERS FROM COURSE
courseCtrl.getCourseTeachers = async (req, res) => {
    try{    
        const course = await Course.findById(req.params.course_id);
        if(!course) return res.status(204).json({message: "Course does not exist"});
        if(course.courseTeachers.length > 0){
            let teachers = await getAllTeachers(course);
            return res.send(teachers);
        }else{
            return res.json({message: "No teachers added in course"});
        }
    }catch(err){
        console.log(err);
    }
}

const getAllTeachers = async (course) => {
    let teachers = [];
    for await(let teacher_id of course.courseTeachers){
        let teacher = await Teacher.findById(teacher_id);
        teachers.push(teacher);
    }
    return teachers;
}


//DELETE TEACHER FROM COURSE
courseCtrl.deleteTeacher = async (req, res) => {
    const course = await Course.findById(req.params.course_id);
        if(!course){
            return res.status(204).json({message: "Course does not exist"});  
        }else{
            if(course.courseTeachers.length > 0){                
                const findTeacher = (teacher_id, index) => {
                    return course.courseTeachers[index] == teacher_id;
                } 
                const teacherIndex = course.courseTeachers.findIndex(findTeacher); 
                if(teacherIndex > -1){
                    course.courseTeachers.splice(teacherIndex, 1);
                    course.save();
                    return res.json({message: "Teacher deleted from course"});
                }else{
                    return res.json({message: "The teacher is not in this course"});
                }
            }else{
                return res.json({message: "No teachers in this course"})
            }
        }
}


module.exports = courseCtrl;