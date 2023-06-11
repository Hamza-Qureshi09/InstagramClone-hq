import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    authorization: false,
    activation: false,
    userInfo: {},
    accessToken: ''
}


export const controls = createSlice({
    name: 'authorizeUser',
    initialState,
    reducers: {
        authenticateUserAndSession: (state, action) => {
            const { newVal } = action.payload
            state.authorization = newVal.authorization,
            state.accessToken = newVal.accessToken
            state.activation = newVal.activation
            state.userInfo = newVal.userInfo
        }
    },
})


export const { authenticateUserAndSession } = controls.actions

export default controls.reducer