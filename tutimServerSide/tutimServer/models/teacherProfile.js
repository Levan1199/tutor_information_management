// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');

// const teacherProfileSchema = new Schema({  
//     sex:{
//         type:String,
//         default:''
//     },
//     dateOfBirth:{
//         type:Date,
//         required: true
//     },
//     district:[{
//         type: String,
//         default:''
//     }],   
//     identify:{
//         type:Number,
//         default:''
//     },
//     address:{
//         type:String,
//         default:''
//     },
//     telnum:{
//         type: Number,
//         default: ''
//     },   
//     email:{
//         type:String,
//         default: ''
//     },
//     grade:[{
//         type:String,
//         default:''
//     }]
//     ,subject:[{
//         type:String,
//         default:''
//     }],   
//     students:{
//         type:Number,
//         default:''
//     },
//     fee:{
//         type:Number,
//         default:''
//     },
//     periodAWeek:{
//         type:Number,
//         default:''
//     },
//     time:{
//         type:String,
//         default:''
//     },
//     description:{
//         type:String,
//         default:''
//     },
// },{
//     timestamps: true
// });

// teacherProfileSchema.plugin(passportLocalMongoose);

// var TeacherProfile = mongoose.model('TeacherProfile', teacherProfileSchema);

// module.exports = TeacherProfile;