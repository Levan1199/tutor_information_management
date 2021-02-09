const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const authenticate = require('../authenticate');
const cors = require('cors');

mongoose.set('useFindAndModify', false);

const Favorites = require('../models/favorite');
const Dishes = require('../models/dishes');
const User = require('../models/user');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
// .options(   (req,res)=>{
//     res.sendStatus(200);
// })
.get( cors(),  (req, res, next)=>{
    // find to findOne
    Favorites.findOne({user: req.user})
    .populate('user')
    .populate('dishes')
    .then((favorite)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(      (req,res,next)=>{
    Favorites.findOne({user: req.user._id})
    .then((favoriteList)=>{    
        if(favoriteList == null){
            Favorites.create({user: req.user._id,dishes:req.body})
            .then((favorite)=>{                                 
                console.log("Favorite created ",favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);                
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
        else if (favoriteList){
            for(obj in req.body){                              
                if(favoriteList.dishes.indexOf(req.body[obj]._id) === -1){
                    favoriteList.dishes.push(req.body[obj]._id);
                }
            }
            favoriteList.save()
            .then((favorite)=>{
                Favorites.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((favorite)=>{
                    console.log("Favorite created ",favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })           
            },(err) => next(err));    
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put(     (req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(      (req,res,next)=>{
    Favorites.findOneAndRemove({user: req.user._id})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=> next(err))
    .catch((err)=>next(err));      
});

favoriteRouter.route('/:dishId')
.options(   (req,res)=>{
    res.sendStatus(200);
})
.get(    (req, res, next)=>{
    Favorites.findOne({user: req.user._id})
    .then((favorites)=>{
        if(!favorites){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists":false, "favorites": favorites});
        }
        else{
            if(favorites.dishes.indexOf(req.params.dishId)<0){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists":false, "favorites": favorites});
            }
            else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists":true, "favorites": favorites});
            }
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(      (req,res,next)=>{
    Favorites.findOne({user: req.user._id})
    .then((favoriteList)=>{    
        if(favoriteList == null){
            Favorites.create({"user": req.user._id, "dishes":[req.params.dishId]})
            .then((favorite)=>{
                Favorites.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((favorite)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })   
            })  
            .catch((err)=>next(err));
        }
        else if (favoriteList){
            if(favoriteList.dishes.indexOf(req.params.dishId) === -1){
                favoriteList.dishes.push(req.params.dishId);
                favoriteList.save()
                .then((favorite)=>{
                    Favorites.findById(favorite._id)
                    .populate('user')
                    .populate('dishes')
                    .then((favorite)=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })   
                })  
                .catch((err)=>{
                    return next(err);
                })                 
            }
        }
    },(err)=>next(err))
    .catch((err)=>next(err)); 
})
.delete(      (req,res,next)=>{
    Favorites.findOne({user: req.user._id})
    .then((favoriteList)=>{    
        if(favoriteList == null){
            err = new Error('Favorite list not found');
            err.status = 404;
            return next(err);               
        }
        else if (favoriteList){               
            var index = favoriteList.dishes.indexOf(req.params.dishId);
            if (index !== -1){
                favoriteList.dishes.splice(index,1);
                favoriteList.save()
                .then((favorite)=>{
                    Favorites.findById(favorite._id)
                    .populate('user')
                    .populate('dishes')
                    .then((favorite)=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })   
                })  
                .catch((err)=>next(err));
            }
            else{
                err = new Error('Dish in Favorite list ' + req.params.dishId + " not found");
                err.status = 404;
                return next(err);
            }
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = favoriteRouter;