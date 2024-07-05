import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../userRequest';
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
    reducers: {
        clearPosts: (state) => {
            state.postDetails = [];
        },
        clearState: (state) => {
            state.status = 'idle';
            state.error = null;
            state.user = null;
            state.postDetails = [];
        }
    },
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
        
        //cases for logout user
            .addCase(logoutUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'idle';
                state.user = null;
                state.postDetails = [];
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload || "error while logging out in otherUser slice";
        })
    }
})

export const { clearPosts,clearState } = otherUserSlice.actions;

export const selectOtherUser = (state) => state.otherUser.user;
export const selectOtherUserPostDetails = (state) => state.otherUser.postDetails;

export default otherUserSlice.reducer;