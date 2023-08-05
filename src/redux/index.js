import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

export default configureStore({
    reducer: {
        User: userSlice
    }
})