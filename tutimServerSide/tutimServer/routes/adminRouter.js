
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const User = require('../models/user');
const adminRouter = express.Router();

adminRouter.use(bodyParser.json());


adminRouter.route('/student')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    User.find({isStudent:true})
    .populate("studentProfile")
    .then((students)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    User.remove({isStudent:true})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

// // For specific Id
adminRouter.route('/student/:userId')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next)=>{
    User.findOne({_id:req.params.userId})
    .populate("studentProfile")
    .then((student)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    },(err)=>next(err))
    .catch((err)=> next(err));
})


.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    User.findOne({_id:req.params.userId})
    .then((user)=>{
        user.isDisable = !user.isDisable;
        user.save();
    },(err)=>next(err))
    .then(()=>{     
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students);
    },(err)=>next(err))
    .catch((err)=> next(err));   
   
});


// for teacher
adminRouter.route('/teacher')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    User.find({isTeacher:true})
    .populate("teacherProfile")
    .then((teachers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    User.remove({isTeacher:true})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

// // For specific Id
adminRouter.route('/teacher/:userId')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next)=>{
    User.findOne({_id:req.params.userId})
    .populate("teacherProfile")
    .then((teacher)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    User.findOne({_id:req.params.userId})
    .then((user)=>{
        user.isDisable = !user.isDisable;
        user.save();
    },(err)=>next(err))
    .then(()=>{    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    },(err)=>next(err))
    .catch((err)=> next(err));   
   
});

module.exports = adminRouter;

