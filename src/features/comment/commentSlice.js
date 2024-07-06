import { createSlice } from '@reduxjs/toolkit';
import { fetchComments, uploadComment } from './commentRequest';

const initialState = {
    status: 'idle',                  //idle loading succeeded failed
    postId: null,
    comments: [],
    error:null
}


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        clearState: (state) => {
            state.status = 'idle';
            state.postId = null;
            state.comments = [];
            state.error = null;
        }
    },
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
        //cases for adding comment
            .addCase(uploadComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
                state.postId = action.payload.post;
            })
            .addCase(uploadComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "error while uploading comment"
        })
    }
})

export const selectComments = state => state.comment.comments;

export const { clearState } = commentSlice.actions;

export default commentSlice.reducer;