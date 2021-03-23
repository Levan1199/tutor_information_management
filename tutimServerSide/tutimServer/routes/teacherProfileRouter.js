
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const authenticate = require('../authenticate');
// const cors = require('./cors');

// mongoose.set('useFindAndModify',false);

// const TeacherRegs = require('../models/teacherReg');

// const teacherRegRouter = express.Router();

// teacherRegRouter.use(bodyParser.json());


// teacherRegRouter.route('/')
// .options(cors.corsWithOptions, (req,res)=>{
//     res.sendStatus(200);
// })
// .get(cors.cors, (req,res,next)=>{
//     TeacherRegs.find(req.query)
//     .then((teachers)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(teachers);
//     },(err)=>next(err))
//     .catch((err)=> next(err));
// })

// .post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
//     // console.log(req.body);
//     TeacherRegs.create(req.body)
//     .then((teacher)=>{
//         console.log('Teacher Created ', teacher);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(teacher);
//     },(err)=>next(err))
//     .catch((err)=> next(err));
// })

// .put( cors(), (req,res,next)=>{
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// })

// .delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
//     TeacherRegs.remove({})
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     },(err)=> next(err))
//     .catch((err)=>next(err));
// });



// module.exports = teacherRegRouter;

