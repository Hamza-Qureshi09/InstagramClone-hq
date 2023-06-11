const route = require('express').Router()
const { RegisterUser, LoginUser, verifySession, updateUserProfile, getSingleUserDetails } = require('../../controls/v1/user')
const verifyTokenAndSession = require('../../middlewares/verifyTokenAndSession')


// user(new entry, get, update, delete management routes)
route
    .post('/v1/userCreate', RegisterUser)
    .post('/v1/LoginUser', LoginUser)
    .post('/v1/verifySession', verifyTokenAndSession, verifySession)
    .put('/v1/updateUserProfile', verifyTokenAndSession, updateUserProfile)
    .post('/v1/getOverallSingleUserInfo', getSingleUserDetails)
// .post('/v1/getSingleuser', getSingleUser)
// .put('/v1/updateSingleuser', updateSingleUser)
// .post('/v1/deleteSingleuser', deleteSingleUser)

module.exports = route