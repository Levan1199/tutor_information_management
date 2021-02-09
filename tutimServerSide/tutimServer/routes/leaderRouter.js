const express = require('express');
const bodyParser = require('body-parser');
// const authenticate = require('../authenticate');
const cors = require('cors');
const Leaders = require('../models/leaders');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
// .options(  (req,res)=>{
//     res.sendStatus(200);
// })
.get(cors(),  (req,res,next)=>{
    Leaders.find(req.query)
    .then((leaders) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err)=> next(err))
    .catch((err)=>next(err));    
})

.post(   (req,res,next)=>{
    Leaders.create(req.body)
    .then((leaders) =>{
        console.log('Leaders Created', leaders);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err)=> next(err))
    .catch((err)=>next(err));    
})
.put(   (req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})

.delete(   (req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=> next(err))
    .catch((err)=>next(err));
});

// For specific leader Id
leaderRouter.route('/:leaderId')
.options(  (req,res)=>{
    res.sendStatus(200);
})
.get(  (req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(   (req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'
    + req.params.leaderId);
})
.put(   (req,res,next)=>{
    Leaders.findOneAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.delete(   (req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Cotent-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports = leaderRouter;

