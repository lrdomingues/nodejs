const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Comment', Schema)