const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const Comments = require('../models/comments');
const authenticate = require('../authenticate');
const Users = require('../models/user');
const TeacherReg = require('../models/teacherReg');
const teacherRegRouter = require('./teacherRegRouter');

mongoose.set('useFindAndModify',false);
const commentRouter = express.Router();

commentRouter.use(bodyParser.json());


commentRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, (req,res,next)=>{
    Comments.find()
    .populate('commenter')
    .then((comments)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);   
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    Users.findOne({_id:req.user._id})
    .populate('studentProfile')
    .then((user)=>{
        req.body.commenter = user.studentProfile._id;
        Comments.create(req.body)
        .then((comment)=>{  
            Comments.findById(comment._id)
            .populate('commenter')
            .then((comment)=>{
                TeacherReg.findOne({_id:comment.commentTo})
                .then((teacher)=>{                  
                    teacher.commentCount += 1;
                    teacher.rate += req.body.rating;
                    teacher.save();
                },(err)=>next(err))
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            },(err)=>next(err))                     
        },(err)=>next(err))
        .catch((err)=>next(err));
    })           
})


.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Comments.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});


module.exports = commentRouter;