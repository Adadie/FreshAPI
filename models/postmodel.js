import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    Author_names: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Posts', PostSchema);