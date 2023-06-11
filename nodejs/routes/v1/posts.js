const route = require('express').Router()
const { createPost, getOverAllPosts } = require('../../controls/v1/posts')
const verifyTokenAndSession = require('../../middlewares/verifyTokenAndSession')


// post(new entry, get, update, delete management routes)
route
    .post('/v1/postCreate', verifyTokenAndSession, createPost)
    .get('/v1/getOverAllPosts', getOverAllPosts)
// .post('/v1/getSinglepost', getSinglePost)
// .put('/v1/updateSinglepost', updateSinglePost)
// .post('/v1/deleteSinglepost', deleteSinglePost)

module.exports = route