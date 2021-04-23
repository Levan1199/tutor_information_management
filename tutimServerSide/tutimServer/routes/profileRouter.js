
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const User = require('../models/user');
const StudentRegs = require('../models/studentReg');
const TeacherRegs = require('../models/teacherReg');

const profileRouter = express.Router();

profileRouter.use(bodyParser.json());


profileRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors, authenticate.verifyUser, (req,res,next)=>{
    User.findOne(req.user._id)
    .then((user)=>{
        if(user.teacherProfile == null && user.studentProfile == null){
            res.statusCode = 204;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }
        else if (user.isTeacher){
            User.findOne(req.user._id)
            .populate('teacherProfile')
            .then((profile)=>{
                console.log('profiles: ', profile);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profile);   
            },(err)=>next(err))
            .catch((err)=> next(err));
        }
        else if(user.isStudent){
            User.findOne(req.user._id)
            .populate('studentProfile')
            .then((profile)=>{
                console.log('profiles: ',profile);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profile);                   
            },(err)=>next(err))
            .catch((err)=> next(err));
        }
    },(err)=>next(err))
    .catch((err)=> next(err));  
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    if(req.body.isTeacher && !req.body.isStudent){
        TeacherRegs.create({"name":req.body.name,"email":req.body.email})
        .then((teacher)=>{
            console.log('in techer', teacher);
            User.findOneAndUpdate({_id:req.user._id},{
                $set:{"teacherProfile":teacher._id,"isTeacher":req.body.isTeacher,
                "isStudent":req.body.isStudent}
            },{new: true})
        .populate('teacherProfile')
        .then((profile)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profile);
        })       
        },(err)=>next(err))
        .catch((err)=> next(err));
    }
    if (!req.body.isTeacher && req.body.isStudent){
        StudentRegs.create({"name":req.body.name,"email":req.body.email})
        .then((student)=>{
        User.findOneAndUpdate({_id:req.user._id},{
            $set:{"studentProfile":student._id,"isTeacher":req.body.isTeacher,
            "isStudent":req.body.isStudent}
        },{new: true})
        .populate('studentProfile')
        .then(()=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profile);
        })       
        },(err)=>next(err))
        .catch((err)=> next(err));
    } 
})


.put( cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    User.findOne({_id:req.user._id})
    .then((user)=>{
        if(user.isTeacher && !user.isStudent){
            User.findOne({_id:req.user._id})
            .populate('teacherProfile')
            .then((profile)=>{
                console.log('profile ',profile);
                profile.teacherProfile.update({
                    $set: req.body
                }, {new: true})
                .then(
                    User.findOne({_id:req.user._id})
                    .populate('teacherProfile')
                    .then((profile)=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(profile);
                    },(err)=>next(err))
                )},(err)=>next(err))
            .catch((err)=> next(err));
        }
        else if (!user.isTeacher && user.isStudent){
            User.findOne({_id:req.user._id})
            .populate('studentProfile')
            .then((profile)=>{
                console.log('profile ',profile);
                profile.studentProfile.update({
                    $set: req.body
                }, {new: true})
                .then(
                    User.findOne({_id:req.user._id})
                    .populate('studentProfile')
                    .then((profile)=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(profile);
                    },(err)=>next(err))
                )},(err)=>next(err))
            .catch((err)=> next(err));
        }
    })   
})

// .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
//     TeacherRegs.remove({})
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     },(err)=> next(err))
//     .catch((err)=>next(err));
// });



module.exports = profileRouter;

