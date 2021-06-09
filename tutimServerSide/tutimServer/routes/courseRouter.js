
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const fs = require('fs');

mongoose.set('useFindAndModify',false);

const Course = require('../models/courses');

const upload = require('./uploadRouter');

const courseRouter = express.Router();

courseRouter.use(bodyParser.json());

courseRouter.route('/')
.options(cors.cors, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.cors, (req,res,next)=>{
    Course.find({})
    .then((courses)=>{
        // var latest=[]
        // for (var n = 1; n <= 3;n++ ){
        //     latest.push(courses[courses.length-n]);
        // }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(courses);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,upload.single('courseImg') ,(req,res,next)=>{
    console.log('inside post course', req.body);
    if(req.file){
        console.log('req file', req.file);
        req.body.imgPath = req.file.filename;
    }
    Course.create(req.body)
    .then((course)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course);
    },(err)=>next(err))
    .catch((err)=> next(err)); 
});

courseRouter.route('/:courseId')
.options(cors.cors, (req,res)=>{
    res.sendStatus(200);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin
    ,upload.single('courseImg'), (req,res,next)=>{
    let isImg;
    if(req.file){
        isImg = true;
        req.body.imgPath = req.file.filename;
    }
    Course.findOne({_id:req.params.courseId})
    .then((course)=>{      
            if(isImg && course.imgPath){
                fs.unlink(__dirname+'/../public/coursesImg/'+course.imgPath, (err)=>{
                    if(err){
                        next(err);
                    }
                });
            }
            course.updateOne({
                $set: req.body
            }, {new: true})
            .then((course)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(course);
            },(err)=>next(err))
            .catch((err)=> next(err));
    },(err)=>next(err))
    .catch((err)=> next(err));   
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Course.findOne({_id:req.params.courseId})
    .then((course)=>{      
        if(course.imgPath){
        fs.unlink(__dirname+'/../public/coursesImg/'+course.imgPath, (err)=>{
            if(err){
                next(err);
            }
        });}
    },(err)=>next(err));
    Course.remove({_id:req.params.courseId})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

module.exports = courseRouter;

