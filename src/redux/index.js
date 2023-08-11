import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import addressSlice from "./slices/addressSlice";
import courseSlice from "./slices/courseSlice";
import topicSlice from "./slices/topicSlice";
import subscriptionSlice from "./slices/subscriptionSlice";

export default configureStore({
    reducer: {
        User: userSlice,
        Address: addressSlice,
        Course: courseSlice,
        Topic: topicSlice,
        Subscription: subscriptionSlice
    }
})