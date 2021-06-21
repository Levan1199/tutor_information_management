const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

const storage = multer.diskStorage({    
    destination:(req,file,cb)=>{
        if(file.fieldname==='avatar'){
            cb(null, 'public/images');
        }
        else if(file.fieldname==='courseImg'){
            cb(null, 'public/coursesImg');
        }
    },
    filename: (req, file, cb)=>{
        cb(null,  Date.now()+'_'+file.originalname)
    }
});

const imageFileFilter = (req, file, cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});


module.exports = upload;