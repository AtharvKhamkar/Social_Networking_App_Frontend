import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = 'https://social-networking-app.onrender.com/api/v1';

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