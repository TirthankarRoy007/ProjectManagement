const mongoose = require('mongoose');
const listModel = new mongoose.Schema({

    task: {
        type: String,
        enum: ["ToDo", "InProgress", "Done"],
        default: "ToDo"
    },
    cards: {
        type: [String]
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model('list', listModel)