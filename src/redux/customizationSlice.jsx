import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainColor: '#BAC5ED',
    subColor: '#4C76FE',
    font: 'Pretendard' ,
    mainCharacter: '/character1.png',
};

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        setMainColor: (state, action) => {
            state.mainColor = action.payload;
        },
        setSubColor: (state, action) => {
            state.subColor = action.payload;
        },
        setFont: (state, action) => {
            state.font = action.payload;
        },
        setMainCharacter: (state, action) => {
            state.mainCharacter = action.payload;
        },
    },
});

export const { setMainColor, setSubColor, setFont, setMainCharacter } = customizationSlice.actions;
export default customizationSlice.reducer; 