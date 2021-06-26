const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const Comments = require('../models/comments');
const authenticate = require('../authenticate');
const Users = require('../models/user');

mongoose.set('useFindAndModify',false);
const commentRouter = express.Router();

commentRouter.use(bodyParser.json());


commentRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{
    res.sendStatus(200);
})
.get(cors.corsWithOptions, (req,res,next)=>{
    Comments.find()
    .populate('commenter')
    // .populate('commentTo')
    .then((comments)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);   
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next)=>{
    Users.findOne({_id:req.user._id})
    .populate('studentProfile')
    .then((user)=>{
        req.body.commenter = user.studentProfile._id;
        Comments.create(req.body)
        .then((comment)=>{
            Comments.findById(comment._id)
            .populate('commenter')
            .populate('commentTo')
            .then((comment)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            })
        },(err)=>next(err))
        .catch((err)=>next(err));
    })           
})


.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    Comments.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));
});

// commentRouter.route('/:commentId')
// .options( cors.corsWithOptions, (req,res)=>{
//     res.sendStatus(200);
// })
// .get( (req,res,next)=>{
//     Comments.findById(req.params.commentId)
//     .populate('author')
//     .then((comment)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(comment);   
//     },(err)=>next(err))
//     .catch((err)=> next(err));
// })
// .post(  (req,res,next)=>{
//     res.statusCode = 403;
//     res.end('POST operation not supported on /comments/'
//     + req.params.commentId);
// })
// .put(  (req, res, next) => {
//     Comments.findById(req.params.commentId)
//     .then((comment)=>{
//         if(comment != null){
//             if(!comment.author.equals(req.user._id)){
//                 err = new Error('You are not authorized to update this comment!');
//                 err.status = 403;
//                 return next(err);
//             }
//             req.body.author = req.user._id;
//             Comments.findByIdAndUpdate(req.params.commentId,{
//                 $set: req.body
//             }, {new: true})
//             .then((comment)=>{
//                 Comments.findById(comment._id)
//                 .populate('author')
//                 .then((comment)=>{
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(comment);
//                 });                    
//             }, (err)=>next(err));
//         }
//         else{
//             err = new Error('Comment ' + req.params.dishId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//     },(err) => next(err))
//     .catch((err)=> next(err));
// })
// .delete(  (req,res,next)=>{
//     Comments.findById(req.params.commentId)
//     .then((comment)=>{
//         if(comment != null){
//             if(!comment.author.equals(req.user._id)){
//                 err = new Error('You are not authorized to delete this comment!');
//                 err.status = 403;
//                 return next(err);
//             }
//             Comments.findByIdAndRemove(req.params.commentId)
//             .then((resp)=>{
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(resp);
//             },(err)=>next(err))
//             .catch((err)=>next(err));
//         }
//         else{
//             err = new Error('Comment ' + req.params.commentId + ' not found');
//             err.status = 404;
//             return next(err);
//         }
//     },(err)=> next(err))
//     .catch((err)=>next(err));
// });

module.exports = commentRouter;