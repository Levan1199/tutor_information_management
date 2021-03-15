const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const StudentReg = require('../models/studentReg');

const studentRegRouter = express.Router();

studentRegRouter.use(bodyParser.json());


studentRegRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    StudentReg.find(req.query)
    .then((studentRegs)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(studentRegs);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    StudentReg.create(req.body)
    .then((studentRegs)=>{
        console.log('Teacher Created ', studentRegs);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(studentRegs);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

// .put( cors(), (req,res,next)=>{
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// })

// .delete( cors(), (req,res,next)=>{
//     Teachers.remove({})
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     },(err)=> next(err))
//     .catch((err)=>next(err));
// });


module.exports = studentRegRouter;