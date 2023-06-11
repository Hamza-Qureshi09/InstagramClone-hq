const { default: axios } = require("axios");
import Constants from 'expo-constants';

const api = axios.create({
    baseURL: Constants.manifest.extra.API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true,
})

// console.log(Constants.manifest.extra.API_URL );
// create instagram user
export const createUserReq = (data) => { return api.post("/api/v1/userCreate", data) }
// login instagram User
export const loginUserReq = (data) => { return api.post("/api/v1/LoginUser", data) }
// user Verify
export const VerifySession = (token) => api.post('/api/v1/verifySession', token)
// update user Profile
export const updateUserProfile = (data) => api.put('/api/v1/updateUserProfile', data)
// get overalluserInfo
export const getOverallSingleUserInfo = (userId) => api.post('/api/v1/getOverallSingleUserInfo',userId)



// create post
export const createPost = (data) => api.post('/api/v1/postCreate', data)
// get overall posts
export const getOverAllPosts = () => api.get('/api/v1/getOverAllPosts')


export default api;