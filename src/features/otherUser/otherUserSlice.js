import { createSlice } from '@reduxjs/toolkit';
import { fetchOtherUser, followUnfollow, otherUserPostDetails } from './otherUserRequest';


const initialState = {
    status: 'idle',               //idle loading succeeded failed
    error: null,
    user: null,
    postDetails: []
}

export const otherUserSlice = createSlice({
    name: 'other_user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOtherUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchOtherUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.postDetails = [];
                state.error = null;
            })
            .addCase(fetchOtherUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "error while fetching other user";
            })
        //cases for other user post details
            .addCase(otherUserPostDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(otherUserPostDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.postDetails.push(...action.payload);
            })
            .addCase(otherUserPostDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "failed to fetch post details";
            })
        
        //cases for other user to follow and unfollow
            .addCase(followUnfollow.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(followUnfollow.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user.followingStatus = !state.user.followingStatus;
            })
            .addCase(followUnfollow.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "failed to follow or unfollow user";
        })
    }
})

export const selectOtherUser = (state) => state.otherUser.user;
export const selectOtherUserPostDetails = (state) => state.otherUser.postDetails;

export default otherUserSlice.reducer;