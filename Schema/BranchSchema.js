const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    branchName : {
        type : String
    }
})

module.exports = mongoose.model('branch',BranchSchema);