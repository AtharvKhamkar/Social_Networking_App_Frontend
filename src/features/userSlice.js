import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './userRequest';

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
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading',
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload.user
                state.posts = action.payload.posts
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
                state.user = null;
                state.posts = null;
                state.token = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed',
                state.error = action.payload || 'failed to logout'
        })
    }
})

export const { setMode, setLogin, setLogout, setPosts } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;