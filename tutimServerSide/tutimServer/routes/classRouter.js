const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const authenticate = require('../authenticate');
const cors = require('cors');

mongoose.set('useFindAndModify',false);

const Class = require('../models/class');

const classRouter = express.Router();

classRouter.use(bodyParser.json());


classRouter.route('/')
.options( (req,res)=>{
    res.sendStatus(200);
})
.get(cors(), (req,res,next)=>{
    Class.find(req.query)
    .then((classes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(classes);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post( cors(), (req,res,next)=>{
    Class.create(req.body)
    .then((classes)=>{
        console.log('Teacher Created ', classes);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(classes);
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


module.exports = classRouter;