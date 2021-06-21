const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    studentId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'StudentReg'
        }
    ,
    teacherId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'TeacherReg'
        }
    
});

var Connections = mongoose.model('Connection', connectionSchema);
module.exports = Connections;