const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name:{
        type: String,
        required: true
    },   
    sex:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required: true
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
        required: true
    },   
    email:{
        type:String,
        required:true
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
        required: true
    },
    periodAWeek:{
        type:Number,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    description:{
        type:String,
        default:''
    },
},{
    timestamps: true
});

var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;