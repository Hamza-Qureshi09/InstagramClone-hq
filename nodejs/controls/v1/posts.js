
const catchAsyncErrors = require('../../middlewares/catchAsycError');//error handling
const ErrorHandler = require('../../utils/errorHandler');
const postModal = require('../../src/modals/postModal')
const userModal = require('../../src/modals/userModal')
const cloudinary = require("cloudinary").v2;
const Joi = require('joi');

// General Details
cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret
});


// @Mode :- Controller
// @Method #POST /api/v1/PostCreate
// @Desc:- create Post (New Entry)
const createPost = catchAsyncErrors(async (req, res, next) => {

    const { title, description, tags, selectedImage, userId, accessToken, username } = req.body;
    let uploadingImage;

    // verfiying fields and data inside fields
    if (!title || !description || !tags || !userId) return next(new ErrorHandler('Invalid credentials', 400))
    const schema = Joi.object({
        username: Joi.string().max(200).required(),
        title: Joi.string().max(200).required(),
        description: Joi.string().max(5000).allow(''),
        tags: Joi.array().required().allow(''),
        selectedImage: Joi.string().allow(''),
        userId: Joi.string().required(),
        accessToken: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return next(new ErrorHandler(error.message, 400))

    // saving post image to cloudinary
    if (selectedImage) {
        // data:image/png;base64,
        uploadingImage = await cloudinary.uploader.upload(`${selectedImage}`, {
            folder: "INSTAGRAM/POSTS",
            transformation: { width: 300, height: 300, crop: 'fill' },
        })
    }

    // creating PostProfile
    const postCreate = await postModal({
        ownerId: userId, ownerName: username, title, description, tags, imageURL: uploadingImage ? uploadingImage.secure_url : '', imagePubliId: uploadingImage ? uploadingImage.public_id : ''
    }).save();

    // saving this post record to its relevent user account
    const updateUserRec = await userModal.findOneAndUpdate(
        { _id: userId },
        {
            $addToSet: { posts: { postId: postCreate._id } }
        },
        { new: true }
    )

    if (postCreate && updateUserRec) return res.status(201).json({ success: "created Successfully!", postCreate })

    return next(new ErrorHandler('Error Occured While creating Post!', 400))

})
// @Mode :- Controller
// @Method #POST /api/v1/getOverAllPosts
// @Desc:- fetching all the posts
const getOverAllPosts = catchAsyncErrors(async (req, res, next) => {


    const allPosts = await postModal.find({}).populate(
        {
            path: 'ownerId',
            select: 'userName userEmail userImage '
        }
    ).select('title description  imageURL imagePubliId likes comments tags ownerName').lean().exec()

    if (allPosts) return res.status(200).json({ success: "fetched posts!", allPosts })

    return next(new ErrorHandler('Error Occured While creating Post!', 400))

})

module.exports = { createPost, getOverAllPosts }