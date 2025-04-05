import { createSlice } from "@reduxjs/toolkit";
import { Mode } from "../../../core/const/mode";

interface AppState {
    avatar: null
    isLoading: boolean
    mode: Mode
}

const initialState: AppState = {
    avatar: null,
    isLoading: false,
    mode: Mode.dark,
}

const appSlice = createSlice({
    initialState: initialState,
    name: "app",
    reducers: {
        updateState: (state, action) => {
            return { ...state, ...action.payload }
        },
    },
})

export const appAction = appSlice.actions
export default appSlice.reducer