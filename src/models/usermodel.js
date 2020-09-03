import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    Fname: {
        type: String,
        required: true,
        min: 3
    },
    Lname: {
        type: String,
        required: true,
        min: 3
    },
    Email: {
        type: String,
        required: true,
        min: 8
    },
    Password: {
        type: String,
        required: true,
        min: 8
    },
    Number: {
        type: String
    },
    date: {
        type: Date,
    default: Date.now
    }
});

//module.exports = mongoose.model('Users', UserSchema);
const Users = mongoose.model('Users', UserSchema);
export default Users;