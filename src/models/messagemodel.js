import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
    Names: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Comments: {
        type: String,
    },
    date: {
        type: Date,
    default: Date.now
    }
});

//module.exports = mongoose.model('Messages', MessageSchema);
const Messages = mongoose.model('Messages', MessageSchema);
export default Messages;