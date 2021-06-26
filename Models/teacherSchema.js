const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const TEACHER = mongoose.model("TEACHER", teacherSchema);

module.exports = TEACHER;