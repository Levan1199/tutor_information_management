
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const authenticate = require('../authenticate');
const cors = require('cors');

mongoose.set('useFindAndModify',false);

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.options( (req,res)=>{
    res.sendStatus(200);
})
.get(cors(), (req,res,next)=>{
    Dishes.find(req.query)
    .populate('comments.author')
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post( cors(), (req,res,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log('Dishes Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.put( cors(), (req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete( cors(), (req,res,next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

// For specific dish Id
dishRouter.route('/:dishId')
.options( (req,res)=>{
    res.sendStatus(200);
})
.get( (req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=> next(err));
})
.post(  (req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'
    + req.params.dishId);
})
.put(  (req, res, next) => {
    Dishes.findOneAndUpdate(req.params.dishId,{
        $set: req.body
    },{new:true})
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=> next(err));
})
.delete( (req,res,next)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

// Comments inside a specific dish



// For specific comment inside a dish


module.exports = dishRouter;

