const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        maxlength: [200, 'Title cannot exceed 200 characters.'],
        required: true,
    },
    description: {
        type: String,
        minlength: 0,
        maxlength: [5000, 'Description cannot exceed 5000 characters.'],
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    imageURL: {
        type: String,
        required: false,
    },
    imagePubliId: {
        type: String,
        required: false,
    },
    videoURL: {
        type: String,
        required: false,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
    ],
    comments: [
        {
            commenterName: {
                type: String,
                required: false,
            },
            comment: {
                type: String,
                required: false,
            },
        },
    ],
}, { timestamps: true });

const Post = mongoose.model('Posts', PostsSchema);

module.exports = Post;