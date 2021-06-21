
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const WaitingLists = require('../models/waitingList');
const Users = require('../models/user');

const waitingListRouter = express.Router();
waitingListRouter.use(bodyParser.json());

waitingListRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    WaitingLists.find()
    .then((list)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(list);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next)=>{
    WaitingLists.deleteMany()
    .then((list)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(list);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})

waitingListRouter.route('/student')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser,  (req,res,next)=>{
    Users.findOne(req.user._id)
    .populate('studentProfile')
    .then((user)=>{
        WaitingLists.find({studentId:user.studentProfile._id})
        .populate('teacherId')
        .then((connection)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(connection);   
        },(err)=>next(err))         
    },(err)=>next(err))   
    .catch((err)=> next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    WaitingLists.findOne({studentId: req.body.studentId, teacherId: req.body.teacherId})
    .then((connection)=>{
        if(connection == null){
            WaitingLists.create({studentId: req.body.studentId, teacherId:req.body.teacherId});          
        }
        else {
            err = new Error('Already connecting');
            err.status = 403;
            return next(err);                     
        }
    },(err)=>next(err))  
    .catch((err)=>next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    Users.findOne({_id:req.user._id})
    .populate('studentProfile')
    .then((student)=>{
        WaitingLists.findOneAndRemove({studentId: student.studentProfile._id, teacherId: req.body.teacherId},(err, callback)=>{
            if(err){
                return next(err);
            }
            else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json("Remove successfully");  
            }
        },(err)=>next(err))
    },(err)=>next(err))
    .catch(err=>next(err));
});

waitingListRouter.route('/teacher')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    Users.findOne({_id:req.user._id})
    .populate('teacherProfile')
    .then((user)=>{
        WaitingLists.find({teacherId:user.teacherProfile._id})
        .populate('studentId')
        .then((connection)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(connection);   
        },(err)=>next(err))         
    },(err)=>next(err))   
    .catch((err)=> next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    WaitingLists.findOne({studentId: req.body.studentId, teacherId: req.body.teacherId})
    .then((connection)=>{
        if(connection == null){
            WaitingLists.create({studentId: req.body.studentId, teacherId:req.body.teacherId});          
        }
        else {
            err = new Error('Already connecting');
            err.status = 403;
            return next(err);                     
        }
    },(err)=>next(err))  
    .catch((err)=>next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    Users.findOne({_id:req.user._id})
    .populate('teacherProfile')
    .then((teacher)=>{
        WaitingLists.findOneAndRemove({studentId: req.body.studentId, teacherId: teacher.teacherProfile._id},(err, callback)=>{
            if(err){
                return next(err);
            }
            else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json("Remove successfully");  
            }
        },(err)=>next(err))      
    },(err)=>next(err))
    .catch(err=>next(err));
});

module.exports = waitingListRouter;

