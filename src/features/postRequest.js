import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POST_URL = 'http://localhost:9090/api/v1';

export const getUserPost = createAsyncThunk(
    'posts/userposts',
    async ({ page, limit, token }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${POST_URL}/users/user-posts?page=${page}&limit=${limit}`,
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