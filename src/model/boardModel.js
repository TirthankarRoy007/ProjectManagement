const mongoose = require('mongoose');
const boardModel = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    members: {
        type: [String]
    },
    lists: {
        ref: 'List'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model('board', boardModel)
