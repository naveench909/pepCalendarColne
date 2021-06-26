const mongoose = require('mongoose');

const classEventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    teacherName : {
        type : String,
        required:true
    },
    batchName : {
        type : String,
        required:true
    },
    start : {
        type : Date,
        required:true
    },
    end : {
        type : Date,
        required:true
    }
})

const ClassesData = mongoose.model("CLASSESDATA", classEventSchema);

module.exports = ClassesData;