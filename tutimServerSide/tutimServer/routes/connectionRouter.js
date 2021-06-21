
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const WaitingLists = require('../models/waitingList');
const Connections = require('../models/connection');
const connectionRouter = express.Router();
connectionRouter.use(bodyParser.json());

connectionRouter.route('/')

connectionRouter.route('/')
.options(cors.cors, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Connections.find()
    .populate('studentId')
    .populate('teacherId')
    .then((list)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(list);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next)=>{
    Connections.deleteMany()
    .then((list)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(list);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})

connectionRouter.route('/student')
.options(cors.cors, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    Connections.find({studentId:req.body.studentId})
    .populate('studentId')
    .populate('teacherId')
    .then((connection)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(connection);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    WaitingLists.findOne({studentId: req.body.studentId, teacherId:req.body.teacherId})
    .then((awaiting)=>{
        if(awaiting == null){
            err = new Error('No request to accept');
            err.status = 404;
            return next(err);
        }
        else{
            Connections.create({studentId: awaiting.studentId, teacherId:awaiting.teacherId})
            .then((connected)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(connected);  
            },(err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err));   
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    Connections.findOneAndRemove({studentId: req.body.studentId, teacherId:req.body.teacherId},(err, callback)=>{
        if(err){
            return next(err);
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json("Remove successfully");  
        }
    })
    .catch(err=>next(err));
});

connectionRouter.route('/teacher')
.get(cors.corsWithOptions, authenticate.verifyUser,  (req,res,next)=>{
    Connections.find({teacherId:req.body.teacherId})
    .populate('studentId')
    .populate('teacherId')
    .then((connection)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(connection);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    WaitingLists.findOne({studentId: req.body.studentId, teacherId:req.body.teacherId})
    .then((awaiting)=>{
        if(awaiting == null){
            err = new Error('No request to accept');
            err.status = 404;
            return next(err);
        }
        else{
            Connections.create({teacherId:awaiting.teacherId,studentId: awaiting.studentId})
            .then((connected)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(connected);  
            },(err)=>next(err))
        }
    },(err)=>next(err))        
.catch((err)=>next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{  
    Connections.findOneAndRemove({studentId: req.body.studentId, teacherId:req.body.teacherId},(err, callback)=>{
        if(err){
            return next(err);
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json("Remove successfully");  
        }
    })
    .catch(err=>next(err));
});

module.exports = connectionRouter;

