const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentRegSchema = new Schema({
    name:{
        type: String,
        required: true
    },   
    email:{
        type:String,
        default:''
    },
    district:[{
        type: String,
        default:''
    }],   
    address:{
        type:String,
        default:''
    },
    telnum:{
        type: Number,
        default:''
    },   
    grade:[{
        type:String,
        default:''
    }],
    subject:[{
        type:String,
        default:''
    }],   
    students:{
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
    fee:{
        type:Number,
        default: 0
    },
    description:{
        type:String,
        default:''
    }  
},{
    timestamps: true
});

var StudentReg = mongoose.model('StudentReg', studentRegSchema);

module.exports = StudentReg;