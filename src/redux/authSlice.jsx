import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    userId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.userId = null;
        },
        kakaoLogin: (state, action) => {
            state.isLoggedIn = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.userId; // userId는 카카오 API에서 제공하는 ID로 설정
        },
    },
});

export const { login, logout, kakaoLogin } = authSlice.actions;
export default authSlice.reducer;