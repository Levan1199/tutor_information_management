
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const User = require('../models/user');
const StudentRegs = require('../models/studentReg');
const TeacherRegs = require('../models/teacherReg');

const upload = require('./uploadRouter');
const { urlencoded } = require('express');

const profileRouter = express.Router();

profileRouter.use(bodyParser.json());
// profileRouter.use(urlencoded());


profileRouter.route('/')
.options(cors.cors, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
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
                // console.log('profiles: ',profile);
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
        .then((profile)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(profile);
        })       
        },(err)=>next(err))
        .catch((err)=> next(err));
    } 
})


.put(cors.corsWithOptions, authenticate.verifyUser
    ,upload.single('avatar'), (req,res,next)=>{
    console.log('inside put 99');
    if(req.file){
        console.log('inside put 99');
        req.body.imgPath = req.file.filename;
    }
    for (const ele in req.body){        
        if(ele == 'imgPath' || ele=='avatar'){
            continue;
        }
        req.body[ele] = JSON.parse(req.body[ele]);
    }
    console.log('inside put1 99');
    User.findOne({_id:req.user._id})
    .then((user)=>{      
        console.log('us 111', user);
        if(user.isTeacher && !user.isStudent){
            User.findOne({_id:req.user._id})
            .populate('teacherProfile')
            .then((profile)=>{      
                profile.teacherProfile.updateOne({
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
            console.log('inside stu');
            User.findOne({_id:req.user._id})
            .populate('studentProfile')
            .then((profile)=>{
                console.log('zz', profile);
                profile.studentProfile.updateOne({
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

// profileRouter.route('/:profileId')
// .options(cors.cors, (req,res)=>{
//     res.sendStatus(200);
// })
// .get(cors.corsWithOptions,(req,res,next)=>{
//     User.findOne(req.params._id)
//     .then((user)=>{
//         if(user.teacherProfile == null && user.studentProfile == null){
//             res.statusCode = 204;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(user);
//         }
//         else if (user.isTeacher){
//             User.findOne(req.user._id)
//             .populate('teacherProfile')
//             .then((profile)=>{
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(profile);   
//             },(err)=>next(err))
//             .catch((err)=> next(err));
//         }
//         else if(user.isStudent){
//             User.findOne(req.user._id)
//             .populate('studentProfile')
//             .then((profile)=>{
//                 // console.log('profiles: ',profile);
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(profile);                   
//             },(err)=>next(err))
//             .catch((err)=> next(err));
//         }
//     },(err)=>next(err))
//     .catch((err)=> next(err));  
// })


module.exports = profileRouter;

