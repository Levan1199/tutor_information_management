
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

mongoose.set('useFindAndModify',false);

const StudentReg = require('../models/studentReg');
const TeacherReg = require('../models/teacherReg');
const User = require('../models/user');
const teacherRegRouter = express.Router();

teacherRegRouter.use(bodyParser.json());


teacherRegRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, (req,res,next)=>{
    User.find({"isTeacher":true})
    .populate('teacherProfile')
    .populate('studentProfile')
    .then((teachers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teachers);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    TeacherReg.create(req.body)
    .then((teacher)=>{
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
    TeacherReg.remove({})
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
    TeacherReg.findById(req.params.teacherId)
    .then((teacher)=>{
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
  
        TeacherReg.findOneAndUpdate({teacherId:req.params.teacherId},{
        $set: req.body
    },{new:true})
    .then(TeacherReg.find({}))
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

//////
teacherRegRouter.route('/add/:studentId')
.options(cors.cors, (req,res)=>{
    res.sendStatus(200);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    if (!req.user.isTeacher){
        err = new Error('Only teacher can register');
        err.status = 404;
        return next(err); 
    }
    StudentReg.findByIdAndUpdate({_id: req.params.studentId},{
        $push:{teacherReg:req.user.teacherProfile}
    })
    .then(()=>{
        TeacherReg.findOneAndUpdate({_id: req.user.teacherProfile},{
            $push:{studentReg:req.params.studentId}
        }, {new:true})
        .then((teacher)=>{    
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(teacher);
        },(err)=>next(err))
    },(err)=>next(err))
    .catch((err)=>next(err));
})

////////////////////////////// add - remove with idy, find1ar push req param
teacherRegRouter.route('/remove/:studentId')
.options(cors.cors, (req,res)=>{
    res.sendStatus(200);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    if (!req.user.isTeacher){
        err = new Error('Only teacher can register');
        err.status = 404;
        return next(err); 
    }
    StudentReg.findByIdAndUpdate({_id: req.params.studentId},{
        $pull:{teacherReg:req.user.teacherProfile}
    })
    .then(()=>{
        TeacherReg.findOneAndUpdate({_id: req.user.teacherProfile},{
            $pull:{studentReg:req.params.studentId}
        }, {new:true})
        .then((teacher)=>{    
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(teacher);
        },(err)=>next(err))
    },(err)=>next(err))
    .catch((err)=>next(err));
})



module.exports = teacherRegRouter;

