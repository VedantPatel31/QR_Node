const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    enrollmentNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    mobileNo: {
        type: Number
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'branch'
    },
    sem: {
        type: Schema.Types.ObjectId,
        ref: 'sem'
    }
})
module.exports = mongoose.model('student', StudentSchema);