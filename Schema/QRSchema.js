const mongoose = require('mongoose');
const { schema } = require('./SemSchema');
const Schema = mongoose.Schema;

const QRSchema = new Schema({	
    branch : {
        type:Schema.Types.ObjectId,
        ref : "branch"
    },
    sem : {
        type:Schema.Types.ObjectId,
        ref : "sem"
    },
    subject : {
        type:Schema.Types.ObjectId,
        ref : "subject"
    },
    facultyId : {
        type:Schema.Types.ObjectId,
        ref : "faculty"
    },
    qrStatus : {
        type:String
    },
    qrText : {
        type:String
    },
    createdAt:{
        type:String
    }
})
module.exports = mongoose.model('qrCode',QRSchema);