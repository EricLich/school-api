const mongoose = require('mongoose');
const model = mongoose.model;

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    courseStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',

    }],
    courseTeachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',

    }]
}, {timestamps:true, versionKey:false});

module.exports = model('Course', courseSchema)
