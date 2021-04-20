const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherRegSchema = new Schema({
    name:{
        type: String,
        required: true
    },   
    sex:{
        type:String,
        default:''
    },
    dateOfBirth:{
        type:Date,
        default:''
    },
    district:[{
        type: String,
        default:''
    }],   
    identify:{
        type:Number,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    telnum:{
        type: Number,
        default: ''
    },   
    email:{
        type:String,
        default: ''
    },
    grade:[{
        type:String,
        default:''
    }]
    ,subject:[{
        type:String,
        default:''
    }],   
    students:{
        type:Number,
        default:''
    },
    fee:{
        type:Number,
        default:''
    },
    periodAWeek:{
        type:Number,
        default:''
    },
    time:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    // teacherId:{
    //     type:String,
    //     required:true
    // }
},{
    timestamps: true
});

var TeacherReg = mongoose.model('TeacherReg', teacherRegSchema);

module.exports = TeacherReg;