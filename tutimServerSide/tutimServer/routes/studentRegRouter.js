const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const StudentReg = require('../models/studentReg');
const User = require('../models/user');
const studentRegRouter = express.Router();

studentRegRouter.use(bodyParser.json());


studentRegRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors, (req,res,next)=>{
    User.find({"isStudent":true})
    .populate('teacherProfile')
    .populate('studentProfile')
    .then((studentRegs)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(studentRegs);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    StudentReg.create(req.body)
    .then((studentRegs)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(studentRegs);
    },(err)=>next(err))
    .catch((err)=> next(err));
})


// studentRegRouter.route('/add/:teacherId')
// .options(cors.cors, (req,res)=>{
//     res.sendStatus(200);
// })
// .put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
//     if (!req.user.isStudent){
//         err = new Error('Only student can register');
//         err.status = 404;
//         return next(err); 
//     }
//     TeacherReg.findByIdAndUpdate({_id: req.params.teacherId},{
//         $push:{studentReg:req.user.studentProfile}
//     })
//     .then(()=>{
//         StudentReg.findOneAndUpdate({_id: req.user.studentProfile},{
//             $push:{teacherReg:req.params.teacherId}
//         }, {new:true})
//         .then((student)=>{    
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(student);
//         },(err)=>next(err))
//     },(err)=>next(err))
//     .catch((err)=>next(err));
// })

// ////////////////////////////// add - remove with idy, find1ar push req param
// studentRegRouter.route('/remove/:teacherId')
// .options(cors.cors, (req,res)=>{
//     res.sendStatus(200);
// })
// .put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
//     if (!req.user.isStudent){
//         err = new Error('Only student can register');
//         err.status = 404;
//         return next(err); 
//     }
//     TeacherReg.findByIdAndUpdate({_id: req.params.teacherId},{
//         $pull:{studentReg:req.user.studentProfile}
//     })
//     .then(()=>{
//         StudentReg.findOneAndUpdate({_id: req.user.studentProfile},{
//             $pull:{teacherReg:req.params.teacherId}
//         }, {new:true})
//         .then((student)=>{    
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(student);
//         },(err)=>next(err))
//     },(err)=>next(err))
//     .catch((err)=>next(err));
// })


module.exports = studentRegRouter;