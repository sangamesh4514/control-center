import { configureStore } from '@reduxjs/toolkit';
import VerifySlice from './slices/VerifySlice';
import LoginSlice from './slices/LoginSlice';
import CustomizationSlice from './slices/CustomizationSlice'

export const store = configureStore({
    reducer: {
        LoginSlice,
        VerifySlice,
        CustomizationSlice
    }
});