
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const TeacherReg = require('../models/teacherReg');
const User = require('../models/user');
const teacherRegRouter = express.Router();

teacherRegRouter.use(bodyParser.json());


teacherRegRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})


.get(cors.corsWithOptions, (req,res,next)=>{
    TeacherReg.find()
    .then((teachers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    },(err)=>next(err))
    .catch((err)=> next(err));
})


.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    TeacherReg.create(req.body)
    .then((teacher)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    },(err)=>next(err))
    .catch((err)=> next(err));
})


.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    TeacherReg.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

// // For specific Teacher Id
teacherRegRouter.route('/:teacherId')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    TeacherReg.findById(req.params.teacherId)
    .then((teacher)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    TeacherReg.findOneAndUpdate({_id:req.params.teacherId},{
        $set: req.body
    },{new:true})
    .then((teachers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    },(err)=>next(err))
    .catch((err)=> next(err));
})



module.exports = teacherRegRouter;

