import { createSlice } from '@reduxjs/toolkit'

export const appControls = createSlice({
    name: 'controls',
    initialState: {
        NewPostScreen: false,
        NewPostImageUri: '',
        NewPostImageBase64: '',
    },
    reducers: {
        NewPostScreenControl: (state, actions) => {
            const { newVal } = actions.payload;
            state.NewPostScreen = newVal
        },
        NewPostImageUriControl: (state, actions) => {
            const { newVal } = actions.payload;
            // console.log(newVal,'hamza');
            state.NewPostImageUri = newVal
        },
        NewPostImageBase64Control: (state, actions) => {
            const { newVal } = actions.payload;
            state.NewPostImageBase64 = newVal
            // console.log(newVal.slice(0,150), 'hamza');
        },
    },
})

// Action creators are generated for each case reducer function
export const { NewPostScreenControl, NewPostImageUriControl, NewPostImageBase64Control } = appControls.actions

export default appControls.reducer