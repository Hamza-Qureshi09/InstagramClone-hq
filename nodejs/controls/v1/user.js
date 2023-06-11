
const catchAsyncErrors = require('../../middlewares/catchAsycError');//error handling
const ErrorHandler = require('../../utils/errorHandler');
const userModal = require('../../src/modals/userModal')
const cloudinary = require("cloudinary").v2;
const Joi = require('joi');
const jwtToken = require('../../utils/tokens');
const cookie = require('../../utils/cookies');
const csrfModel = require('../../src/modals/csrf');
const bcrypt = require('bcrypt')

// General Details
cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret
});

// @Mode :- Controller
// @Method #POST /api/v1/PostCreate
// @Desc:- create Post (New Entry)
const RegisterUser = catchAsyncErrors(async (req, res, next) => {
    const { userName, userEmail, userPassword } = req.body;
    // let uploadingImage;

    // verfiying fields and data inside fields
    if (!userName || !userEmail || !userPassword) return next(new ErrorHandler('Invalid credentials', 400))
    const schema = Joi.object({
        userName: Joi.string().allow(''),
        userEmail: Joi.string().required(),
        userPassword: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return next(new ErrorHandler(error.message, 400))


    // saving post image to cloudinary
    // if (userImage) {
    //     uploadingImage = await cloudinary.uploader.upload(`data:image/png;base64,${userImage}`, {
    //         folder: "INSTAGRAM/USERS",
    //         transformation: { width: 300, height: 300, crop: 'fill' },
    //     })
    // }

    // 2. Initialize hashedPassword variable
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // creating user
    const userCreate = await userModal({
        userName, fullName: '', userEmail, userPassword: hashedPassword, userImage: ''
    }).save();

    // 4. specific response
    const { createdAt, updatedAt, ...userInfo } = userCreate._doc

    if (userCreate) return res.status(201).json({ success: "created Successfully!", userCreate: userInfo })

    return next(new ErrorHandler('Error Occured While creating Post!', 400))

})
// @Mode :- Controller
// @Method #POST /api/v1/LoginUser
// @Desc:- Login user (giving access)
const LoginUser = catchAsyncErrors(async (req, res, next) => {
    const { userEmail, userPassword } = req.body;


    // verfiying fields and data inside fields
    if (!userEmail || !userPassword) return next(new ErrorHandler('Invalid credentials', 400))
    const schema = Joi.object({
        userEmail: Joi.string().required(),
        userPassword: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return next(new ErrorHandler(error.message, 400))

    // 2. finding user exist or not
    const userExist = await userModal.findOne({ userEmail }).select('+userPassword');

    if (userExist) {
        // 3. comparing passwords
        const matchPass = await bcrypt.compare(userPassword, userExist.userPassword)
        if (matchPass) {

            // 4. generating AcsT
            const acsT = jwtToken(userExist._id, process.env.Token_Secret, process.env.Token_Algorithum, process.env.TAuthAudience, process.env.issuer, process.env.Token_Expire);

            // 5. saving user session
            await csrfModel({
                userId: userExist._id,
                AccessToken: acsT,
                docExpire: new Date(Date.now() + 60 * 60 * 1000),
            }).save()

            const { createdAt, updatedAt, userPassword, ...userInfo } = userExist._doc
            return res.status(200).json({ message: 'success...', userInfo, authorization: true, activation: true, accessToken: `_HHQ_${acsT}` })
        } else {
            return next(new ErrorHandler('Bad Request!', 403))
        }
    } else {
        return next(new ErrorHandler('User Not Found!', 404))
    }

    // creating user
    // const userCreate = await userModal({
    //     userName, fullName: fullName ? fullName : '', userEmail, userPassword, userImage: uploadingImage ? uploadingImage.secure_url : ''
    // }).save();

    // if (userCreate) return res.status(201).json({ success: "created Successfully!", userCreate })

    // return next(new ErrorHandler('Error Occured While creating Post!', 400))

})
// @Mode :- Controller
// #POST /api/v1/verifySession
// @Desc:- Verify Me (verifying access)
const verifySession = catchAsyncErrors(async (req, res, next) => {

    const userInfo = req.userInfo;
    const token = req.token;
    // console.log(userInfo, token, 'verify me');

    return res.status(200).json({ message: 'success...', userInfo, authorization: true, activation: true, accessToken: token })
})
// @Mode :- Controller
// #POST /api/v1/verifySession
// @Desc:- Verify Me (verifying access)
const updateUserProfile = catchAsyncErrors(async (req, res, next) => {

    const userInfo = req.userInfo;
    const token = req.token;
    // title, description, tags, selectedImage, userId, accessToken, username
    const { userName, userId, socialLinks, userBio, fullName, userImage, accessToken, yourWebsite } = req.body;
    let uploadingImage;

    // saving user image to cloudinary
    if (userImage) {
        uploadingImage = await cloudinary.uploader.upload(`${userImage}`, {
            folder: "INSTAGRAM/USERS",
            transformation: { width: 300, height: 300, crop: 'fill' },
        })
    }

    // updating user profile
    const findUserAndUpdate = await userModal.findOneAndUpdate({ _id: userId }, {
        $set: {
            userName,
            fullName,
            Bio: userBio,
            userImage: uploadingImage ? uploadingImage.secure_url : '',
            userImagePublicId: uploadingImage ? uploadingImage.public_id : '',
            yourWebsite: yourWebsite ? yourWebsite : '',
        },
        $push: {
            socialAccounts: { $each: socialLinks ? socialLinks : [] }
        }
    }, { new: true }).lean().exec()


    if (findUserAndUpdate) return res.status(200).json({ message: 'success...', userInfo: findUserAndUpdate, authorization: true, activation: true, accessToken })

    return next(new ErrorHandler('Error Occured While Updating Your Profile!', 400))

})
// @Mode :- Controller
// #POST /api/v1/verifySession
// @Desc:- Verify Me (verifying access)
const getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {

    const { userId } = req.body
    if (!userId) return next(new ErrorHandler('Incomplete Information', 400))
    // finding user 
    const userDetails = await userModal.findOne({ _id: userId }).populate({
        path: 'posts.postId',
        model: 'Posts',
        select: '_id imageURL'
    }).lean().exec()

    if (userDetails) return res.status(200).json({ message: 'success...', userDetails })

    return next(new ErrorHandler('Error Occured While Fetching Profile details!', 400))

})

module.exports = { RegisterUser, LoginUser, verifySession, updateUserProfile, getSingleUserDetails }