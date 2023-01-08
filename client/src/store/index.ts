import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "../reducers/globalSlice";

const store = configureStore({
    reducer: {
        global: globalReducer,
    },
});

export default store
