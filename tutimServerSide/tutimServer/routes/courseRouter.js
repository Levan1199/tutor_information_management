
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
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, (req,res,next)=>{
    Course.find({})
    .then((courses)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(courses);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,upload.single('courseImg') ,(req,res,next)=>{
    if(req.file){
        console.log('file ',req.file.filename);
        req.body.imgPath = req.file.filename;
    }
    for (const ele in req.body){        
        if(ele == 'imgPath' || ele=='courseImg'){
            continue;
        }
        req.body[ele] = JSON.parse(req.body[ele]);
    }
    Course.create(req.body)
    .then(()=>{
        Course.find()
        .then((course)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(course);
        },(err)=>next(err))      
    },(err)=>next(err))
    .catch((err)=> next(err)); 
});

courseRouter.route('/:courseName')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, (req,res,next)=>{
    Course.findOne({name: req.params.courseName})
    .then((courses)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(courses);   
    },(err)=>next(err))
    .catch((err)=> next(err));  
})


.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin
    ,upload.single('courseImg'), (req,res,next)=>{
    let isImg;
    if(req.file){
        isImg = true;
        req.body.imgPath = req.file.filename;
    }
    for (const ele in req.body){        
        if(ele == 'imgPath' || ele=='courseImg'){
            continue;
        }
        req.body[ele] = JSON.parse(req.body[ele]);
    }
    Course.findOne({name:req.params.courseName})
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
        })
        .then(()=>{
            Course.find()
            .then(course=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(course);
            },(err)=>next(err))          
        },(err)=>next(err))
        .catch((err)=> next(err));
    },(err)=>next(err))
    .catch((err)=> next(err));   
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Course.findOne({name:req.params.courseName})
    .then((course)=>{      
        if(course.imgPath){
        fs.unlink(__dirname+'/../public/coursesImg/'+course.imgPath, (err)=>{
            if(err){
                next(err);
            }
        });}
    },(err)=>next(err));
    Course.remove({name:req.params.courseName})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});
module.exports = courseRouter;

