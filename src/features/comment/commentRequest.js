import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COMMENT_URL = "http://localhost:9090/api/v1";

export const fetchComments = createAsyncThunk(
    'comment/fetch',
    async ({ token, postId, }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${COMMENT_URL}/comment/${postId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
            });

            return response.data.response;
        } catch (error) {
            if(!error.message){
                throw error;
            }

            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadComment = createAsyncThunk(
    'comment/upload',
    async ({ token, postId,content }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${COMMENT_URL}/comment/${postId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    content
                }
            });

            return response.data.response;
        } catch (error) {
            if (!error.message) {
                throw error;
            }

            return rejectWithValue(error.response.data)
        }
    }
)