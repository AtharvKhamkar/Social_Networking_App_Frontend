import { createSlice } from '@reduxjs/toolkit';
import { getUserFeed, likePost, uploadPost } from './postRequest';
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
                state.error = null;
                state.user = null;
                state.token = null;
                state.posts = [];
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
                if (action.meta.arg.page === 1) {
                    state.posts = action.payload;
                } else {
                    state.posts = {
                        ...state.posts,
                        docs: [...state.posts.docs, ...action.payload.docs],
                        page: action.payload.page,
                        totalPages: action.payload.totalPages,
                    }
                }
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
            
            //cases for upload post
            .addCase(uploadPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadPost.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.user.user.posts.push(action.payload._id)
            })
            .addCase(uploadPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Error while uploading post'
            })
        
        //cases for like post
            .addCase(likePost.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const likedPost = state.posts.docs.find((post) => post._id === action.payload._id);
                likedPost.like_status = !likedPost.like_status;
                likedPost.like_count = action.payload.like_count;
            })
            .addCase(likePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'error while liking the post'
        })
    }
})

export const { setMode, setLogin, setLogout, setPosts } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUserProfile = (state) => state.auth.user;
export const selectUserPosts = (state) => state.auth.posts;
export const checkLoggedIn = (state) => state.auth.token;

export default authSlice.reducer;