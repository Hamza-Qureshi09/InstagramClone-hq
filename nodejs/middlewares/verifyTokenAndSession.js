const catchAsyncError = require('./catchAsycError')
const jwt = require('jsonwebtoken')
const csrfModel = require('../src/modals/csrf')
const userModel = require('../src/modals/userModal')
const ErrorHandler = require('../utils/errorHandler')


module.exports = catchAsyncError(
    async (req, res, next) => {
        const { accessToken } = req.body

        // cookie exist or not
        if (!accessToken) {
            return next(new ErrorHandler('Unauthorized!', 401))
        }

        const acsToken = accessToken?.split('_HHQ_')[1]

        // verify token
        const decodedToken = jwt.verify(acsToken, process.env.Token_Secret);

        // verify that token is expired or not
        if (decodedToken.exp * 1000 < Date.now()) {
            return next(new ErrorHandler('Unauthorized!', 401))
        }

        if (decodedToken._id) {
            // session exist or not (for session)
            const csrfUser = await csrfModel.findOne({ userId: decodedToken._id }).lean().exec()

            if (csrfUser) {
                // finding user 
                const userDetails = await userModel.findOne({ _id: csrfUser.userId }).select('+userPassword');
                const { createdAt, updatedAt, userPassword, ...userInfo } = userDetails._doc
                // success
                req.userInfo = userInfo,
                req.token = accessToken,
                    next()

            } else {
                // session expired
                return next(new ErrorHandler('Unauthorized! Expired', 401))
            }
        } else {
            return next(new ErrorHandler('Unauthorized!', 401))
        }
    }
)