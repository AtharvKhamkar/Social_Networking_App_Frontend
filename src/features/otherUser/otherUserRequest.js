import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = "https://social-networking-app.onrender.com/api/v1";

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