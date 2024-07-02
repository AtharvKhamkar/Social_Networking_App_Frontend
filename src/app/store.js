import { configureStore } from '@reduxjs/toolkit'
import suggestReducer from '../features/Suggest/suggestSlice'
import authReducer from '../features/userSlice'

export const store = configureStore({
    reducer: {
        'auth': authReducer,
        'suggest':suggestReducer
    }, 
})