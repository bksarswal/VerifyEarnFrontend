import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/Reducer/AuthReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})