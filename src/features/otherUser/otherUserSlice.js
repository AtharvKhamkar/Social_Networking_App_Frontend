import { createSlice } from '@reduxjs/toolkit';
import { fetchOtherUser } from './otherUserRequest';


const initialState = {
    status: 'idle',               //idle loading succeeded failed
    error: null,
    user : null
}

export const otherUserSlice = createSlice({
    name: 'other_user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOtherUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchOtherUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchOtherUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "error while fetching other user";
        })
    }
})

export const selectOtherUser = (state) => state.otherUser.user;

export default otherUserSlice.reducer;