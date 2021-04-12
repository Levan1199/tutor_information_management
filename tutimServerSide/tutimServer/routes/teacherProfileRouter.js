
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

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
    .populate('teacherProfile')
    .then((profile)=>{
        // console.log('profile ',profile);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(profile);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

// .post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
//     User.findOne(req.user._id)
//     TeacherRegs.create(req.body)
//     .then((teacher)=>{
//         console.log('Teacher Created ', teacher);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(teacher);
//     },(err)=>next(err))
//     .catch((err)=> next(err));
// })


.put( cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    User.findOneAndUpdate({_id:req.user._id},{
        $set: req.body
        }, {new: true})
    .populate('teacherProfile')
    .then((profile)=>{
        console.log('profile ',profile);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(profile);
    },(err)=>next(err))
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

