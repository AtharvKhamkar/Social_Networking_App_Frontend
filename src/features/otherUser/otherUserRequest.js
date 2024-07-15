import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import conf from '../../conf/conf';

const USER_URL = conf.projectBaseUrl;

export const fetchOtherUser = createAsyncThunk(
    'other/user',
    async ({ token, userName },{ rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${USER_URL}/users/${userName}`,
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

            return rejectWithValue(error.response.data)
        }
    }
)

export const otherUserPostDetails = createAsyncThunk(
    'other/postDetails',
    async ({ token, page, limit,_id }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${USER_URL}/users/user-posts/${_id}?page=${page}&limit=${limit}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })

            return response.data.response.docs;
        } catch (error) {
            if (!error.message) {
                throw error;
            }

            rejectWithValue(error.response.data);
        }
    }
    
)

export const followUnfollow = createAsyncThunk(
    'other/follow',
    async ({ token, Id }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: `${USER_URL}/follow/${Id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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