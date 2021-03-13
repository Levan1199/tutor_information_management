const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name:{
        type: String,
        required: true
    },   
    grade:[{
        type:String,
        default:''
    }],
    subject:[{
        type:String,
        default:''
    }],  
    address:{
        type:String,
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

var Class = mongoose.model('Classes', classSchema);

module.exports = Class;