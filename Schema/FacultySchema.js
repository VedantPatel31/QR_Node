const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    password: {
        type : String
    },
})
module.exports = mongoose.model('faculty',FacultySchema);