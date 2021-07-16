const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const StudentReg = require('../models/studentReg');
const User = require('../models/user');
const studentRegRouter = express.Router();

studentRegRouter.use(bodyParser.json());


studentRegRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})


.get(cors.corsWithOptions, (req,res,next)=>{
    StudentReg.find()
    .then((students)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students);
    },(err)=>next(err))
    .catch((err)=> next(err));
})



.post(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    StudentReg.create(req.body)
    .then((studentRegs)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(studentRegs);
    },(err)=>next(err))
    .catch((err)=> next(err));
})



module.exports = studentRegRouter;