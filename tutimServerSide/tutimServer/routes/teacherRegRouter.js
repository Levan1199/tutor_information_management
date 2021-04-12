
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const TeacherRegs = require('../models/teacherReg');
const User = require('../models/user');
const teacherRegRouter = express.Router();

teacherRegRouter.use(bodyParser.json());


teacherRegRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, (req,res,next)=>{
    TeacherRegs.find({})
    .then((teachers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    // console.log(req.body);
    TeacherRegs.create(req.body)
    .then((teacher)=>{
        console.log('Teacher Created ', teacher);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

// .put( cors(), (req,res,next)=>{
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// })

.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    TeacherRegs.remove({})
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
    console.log('auth', req.params.teacherId);
    TeacherRegs.findById(req.params.teacherId)
    .then((teacher)=>{
        console.log(teacher);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teacher);
    },(err)=>next(err))
    .catch((err)=> next(err));
})
// .post(  (req,res,next)=>{
//     res.statusCode = 403;
//     res.end('POST operation not supported on /dishes/'
//     + req.params.dishId);
// })
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // User.findOneAndUpdate(req.params.teacherId,{
    //     $set:{"username":req.body.name}
    // })
    // .then(
        console.log('b4 ',req.user);
    TeacherRegs.findOneAndUpdate({teacherId:req.params.teacherId},{
        $set: req.body
    },{new:true})
    .then(TeacherRegs.find({}))
    .then((teachers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    },(err)=>next(err))
    .catch((err)=> next(err));
    // )
    // .then((teacher)=>{
    //     console.log('update ', teacher);
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(teacher);
    // },(err)=>next(err))
    // .catch((err)=> next(err));
})
// .delete( (req,res,next)=>{
//     Dishes.findByIdAndRemove(req.params.dishId)
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     },(err)=> next(err))
//     .catch((err)=>next(err));
// });

// Comments inside a specific dish



// For specific comment inside a dish


module.exports = teacherRegRouter;

