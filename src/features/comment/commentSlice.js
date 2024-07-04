import { createSlice } from '@reduxjs/toolkit';
import { fetchComments } from './commentRequest';

const initialState = {
    status: 'idle',                  //idle loading succeeded failed
    postId: null,
    comments: [],
    error:null
}


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = [...action.payload]
                state.postId = action.payload[0].post;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "error while fetching comments"
        })
    }
})

export const selectComments = state => state.comment.comments;

export default commentSlice.reducer;