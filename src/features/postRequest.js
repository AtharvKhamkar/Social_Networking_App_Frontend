import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import conf from '../conf/conf';

const POST_URL = conf.projectBaseUrl;

export const getUserFeed = createAsyncThunk(
    'posts/userposts',
    async ({ page, limit, token }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${POST_URL}/users/?page=${page}&limit=${limit}`,
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

            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadPost = createAsyncThunk(
    'posts/upload',
    async ({ description, content,token }, { rejectWithValue }) => {
        const formData = new FormData();
        formData.append('description', description);
        if (content) {
            formData.append('content', content);
        }

        try {
            const response = await axios({
                method: 'POST',
                url: `${POST_URL}/posts/upload`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':`Bearer ${token}`
                },
                data: formData
            })

            return response.data.response;
            
        } catch (error) {
            if (!error.message) {
                throw error;
            }

            return rejectWithValue(error.response.data)
        }
    }
)

export const likePost = createAsyncThunk(
    'posts/like',
    async ({ token, Id }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${POST_URL}/like/${Id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })

            return response.data.response;
        } catch (error) {
            if (!error.message) {
                throw error;
            }

            return rejectWithValue(error.response.data);
        }
    }
)