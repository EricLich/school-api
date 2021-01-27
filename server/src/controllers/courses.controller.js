const Course = require('../models/Course');

const courseCtrl = {};

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


module.exports = courseCtrl;