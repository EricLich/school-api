const mongoose = require('mongoose');
const model = mongoose.model;

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type:String,
        required:false
    },
    birthDate: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, {timestamps: true, versionKey:false});

module.exports = model('Student', studentSchema)
