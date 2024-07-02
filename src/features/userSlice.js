import { createSlice } from '@reduxjs/toolkit';
import { getUserFeed } from './postRequest';
import { loginUser, logoutUser, signupUser, userprofile } from './userRequest';

const initialState = {
    mode: "light",
    status: 'idle',  //idle, loading, succeeded, failed
    error:null,
    user: null,
    token: null,
    posts:[],
}



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading',
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.accessToken      
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || 'failed to login'

            
            })
        
        //Cases for logout user
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed',
                state.error = action.payload || 'failed to logout'
            })
        
        //cases for signup user
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state,action) => {
                state.status = 'succeeded';
            })
            .addCase(signupUser.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.payload || 'failed to signup'
            })
        
            //cases for fetching user posts
            .addCase(getUserFeed.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getUserFeed.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(getUserFeed.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'failed to fetch user posts';
            })
        
        //cases for fetching user profile
            .addCase(userprofile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userprofile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = action.payload.error;
            })
            .addCase(userprofile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "failed to fetch user profile"
        })
    }
})

export const { setMode, setLogin, setLogout, setPosts } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUserProfile = (state) => state.auth.user;
export const selectUserPosts = (state) => state.auth.posts;

export default authSlice.reducer;