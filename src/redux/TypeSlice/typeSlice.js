import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentType: "Movies"
}

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        getType() {},
        setType: (state, {payload}) => ({
            ...state,
            currentType: payload
        })
    }
})

export const {getType, setType} = typeSlice.actions;
export default typeSlice.reducer;