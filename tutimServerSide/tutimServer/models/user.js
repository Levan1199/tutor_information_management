var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    facebookId: String,
    admin:{
        type: Boolean,
        default: false
    },
    teacherProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'TeacherReg'
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);