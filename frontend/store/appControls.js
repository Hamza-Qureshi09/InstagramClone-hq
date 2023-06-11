import { createSlice } from '@reduxjs/toolkit'

export const appControls = createSlice({
    name: 'controls',
    initialState: {
        NewPostScreen: false,
        NewPostImageUri: '',
        NewPostImageBase64: '',
        UserLogin: false,
    },
    reducers: {
        NewPostScreenControl: (state, actions) => {
            const { newVal } = actions.payload;
            state.NewPostScreen = newVal
        },
        NewPostImageUriControl: (state, actions) => {
            const { newVal } = actions.payload;
            state.NewPostImageUri = newVal
        },
        NewPostImageBase64Control: (state, actions) => {
            const { newVal } = actions.payload;
            state.NewPostImageBase64 = newVal
        },
        AuthDataLoginHint: (state, actions) => {
            const { newVal } = actions.payload;
            state.UserLogin = newVal
        },
    },
})

// Action creators are generated for each case reducer function
export const { NewPostScreenControl, NewPostImageUriControl, NewPostImageBase64Control, AuthDataLoginHint } = appControls.actions

export default appControls.reducer