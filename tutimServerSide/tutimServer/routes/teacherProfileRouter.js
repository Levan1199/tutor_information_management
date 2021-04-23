
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);


const StudentRegs = require('../models/studentReg');
const TeacherRegs = require('../models/teacherReg');
const User = require('../models/user');

const teacherProfileRouter = express.Router();

teacherProfileRouter.use(bodyParser.json());


teacherProfileRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors, authenticate.verifyUser, (req,res,next)=>{
    User.findOne(req.user._id)
    .then((user)=>{
        if(user.teacherProfile){
            User.findOne(req.user._id)
            .populate('teacherProfile')
            .then((profile)=>{
                console.log('profiles: ',typeof(profile));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(profile);   
                
            },(err)=>next(err))
            .catch((err)=> next(err));
        }
        else if(user.teacherProfile==null){
            res.statusCode = 204;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }
    },(err)=>next(err))
    .catch((err)=> next(err));
  
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    console.log('in post ',req.body);
    TeacherRegs.create({"name":req.body.name,"email":req.body.email})
    .then((teacher)=>{
        User.findOneAndUpdate({_id:req.user._id},{
            $set:{"teacherProfile":teacher._id,"isTeacher":req.body.isTeacher,
            "isStudent":req.body.isStudent}
        },{new: true})
        .populate('teacherProfile')
        .then(()=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
        })       
    },(err)=>next(err))
    .catch((err)=> next(err));
})


.put( cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    // User.findOneAndUpdate({_id:req.user._id},{
    //     $set: {
    //         "teacherProfile.$": req.body
    //     }}, {new: true})
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
})

// .delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
//     TeacherRegs.remove({})
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     },(err)=> next(err))
//     .catch((err)=>next(err));
// });



module.exports = teacherProfileRouter;

