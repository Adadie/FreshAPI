import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    Comments: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Comment', CommentSchema);