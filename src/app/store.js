import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import suggestReducer from '../features/Suggest/suggestSlice';
import otherUserReducer from '../features/otherUser/otherUserSlice';
import authReducer from '../features/userSlice';

export const store = configureStore({
    reducer: {
        'auth': authReducer,
        'suggest': suggestReducer,
        'otherUser': otherUserReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});