import {createSlice, Slice, SliceCaseReducers} from "@reduxjs/toolkit";

interface InitialState {
    mode: string;
    userId: string;
}

const initialState: InitialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
};

export const globalSlice: Slice<InitialState,
    SliceCaseReducers<InitialState>,
    "global"> = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const {setMode} = globalSlice.actions;

export default globalSlice.reducer;
