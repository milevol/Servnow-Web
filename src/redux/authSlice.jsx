import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,     // 로그인 상태
    stayedLoggedIn: false, // 로그인 상태 유지 여부
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.stayedLoggedIn = action.payload.stayedLoggedIn || false; // stayedLoggedIn 상태 설정
        },
        kakaoLogin: (state) => {
            state.isLoggedIn = true;
            state.stayedLoggedIn = false; // 카카오 로그인은 자동으로 상태 유지
        },
    },
});

export const { login, kakaoLogin } = authSlice.actions;
export default authSlice.reducer;