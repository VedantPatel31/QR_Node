const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    subjectName: {
        type: String
    },
    subjectCode: {
        type: Number
    },
    docURL: {
        type: String
    },
    credits: {
        type: Number
    }
})
module.exports = mongoose.model('subject',SubjectSchema)