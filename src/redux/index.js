import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import addressSlice from "./slices/addressSlice";

export default configureStore({
    reducer: {
        User: userSlice,
        Address: addressSlice
    }
})