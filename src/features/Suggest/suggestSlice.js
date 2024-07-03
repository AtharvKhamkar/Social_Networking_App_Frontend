import { createSlice } from '@reduxjs/toolkit'
import { logoutUser, suggestFriends } from '../userRequest'


const initialState = {
    status: 'idle',         //idle loading succeeded failed
    error: null,
    users:[]
}


export const suggestSlice = createSlice({
    name: "suggest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(suggestFriends.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(suggestFriends.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(suggestFriends.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "failed to fetch suggested users"
            })
        
        //cases for logout
            .addCase(logoutUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.users = [];
                state.status = 'idle';
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.payload || 'error while logging out in suggest slice';
        })
    }
})

export const selectSuggestedUsers = (state) => state.suggest.users;

export default suggestSlice.reducer;