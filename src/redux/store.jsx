import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import customizationReducer from './customizationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        customization: customizationReducer,
    },
});

export default store;