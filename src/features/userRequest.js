import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import conf from '../conf/conf';

const USER_URL = conf.projectBaseUrl;

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async ({ userName, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${USER_URL}/users/login`,
                headers: {
                    'Content-Type':'application/json'
                },
                data: {
                    userName,
                    email,
                    password
                }
            })

            return response.data.response
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            
            return rejectWithValue(error.response.data)
        }
    }
)


export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${USER_URL}/users/logout`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })

            return response.data.response
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            
            return rejectWithValue(error.response.data);
        }
    }
)

export const signupUser = createAsyncThunk(
    'users/signup',
    async ({name, userName, email, password, bio, avatar, coverImage }, { rejectWithValue }) => {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('bio', bio);
        if (avatar) {
            formData.append('avatar', avatar)
        };

        if (coverImage) {
            formData.append('coverImage',coverImage)
        };

        try {
            const response = await axios({
                method: 'POST',
                url: `${USER_URL}/users/register`,
                headers: {
                    'Content-Type':'multipart/form-data'
                },
                data: formData
            })

            return response.data.response;
        } catch (error) { 
            if (!error.response) {
                throw error;
            }

            return rejectWithValue(error.response.data)
            
        }
    }
)

export const suggestFriends = createAsyncThunk(
    'users/suggestFriend',
    async ({ token,page,limit }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${USER_URL}/users/suggest-friends?page=${page}&limit=${limit}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
                
            })

            return response.data.response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }

            return rejectWithValue(error.response.data)
        }
    }
)

export const userprofile = createAsyncThunk(
    'users/profile',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${USER_URL}/users/profile`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })

            return response.data.response;
        } catch (error) {
            if (!error.response) {
                throw error;
            }

            return rejectWithValue(error.response.data)
        }
    }
)