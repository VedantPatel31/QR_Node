const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemSchema = new Schema ({
    title : {
        type : String
    }
})

module.exports = mongoose.model('sem',SemSchema);