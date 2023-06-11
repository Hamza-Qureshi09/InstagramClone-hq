const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    userEmail: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    userPassword: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    Bio: {
        type: String,
        maxlength: [200, 'Title cannot exceed 200 characters.'],
        defalult: ''
    },
    userImage: {
        type: String,
        default: '',
    },
    userImagePublicId: {
        type: String,
        default: '',
    },
    yourWebsite: {
        type: String,
        required: false,
    },
    yourSaved: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Posts',
                required: false,
            },
        ],
        required: false,
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        required: false,
    },
    followings: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        required: false,
    },
    posts: [
        {
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Posts',
                required: false,
            }
        },
    ],
    socialAccounts: {
        type: [String],
        required: false,
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;