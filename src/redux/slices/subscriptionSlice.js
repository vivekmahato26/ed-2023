import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/api";

const SubscriptionSlice = createSlice({
    name:"Subscription",
    initialState: {
        value: {
            addSubscription: {},
        }
    },
    reducers:{},
    extraReducers:builder => {
        builder.addCase(addSubscription.fulfilled, (state,action) => {
            state.value.addSubscription = action.payload;
            state.value.error = null
        })
        builder.addCase(addSubscription.rejected, (state,action) => {
            state.value.addSubscription = {};
            state.value.error = action.error
        })
    }
})

export const addSubscription = createAsyncThunk("/addSubscription", async(SubscriptionData) => {
    const token = localStorage.getItem("token");
    const {data} = await axios.post(baseUrl+"/subscription/add",SubscriptionData,{
        headers: {
            Authorization: "Bearer "+ token
        }
    })
    return data;
})


export default SubscriptionSlice.reducer;