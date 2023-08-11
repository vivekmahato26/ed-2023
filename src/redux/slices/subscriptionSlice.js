import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/api";

const SubscriptionSlice = createSlice({
    name:"Subscription",
    initialState: {
        value: {
            addSubscription: {},
            subscriptions: []
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
        builder.addCase(fetchSubscriptions.fulfilled, (state,action) => {
            state.value.subscriptions = action.payload;
            state.value.error = null
        })
        builder.addCase(fetchSubscriptions.rejected, (state,action) => {
            state.value.subscriptions = [];
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


export const fetchSubscriptions = createAsyncThunk("/fetchSubs", async(subsArr) => {
    const token = localStorage.getItem("token");
    const subsPromises = subsArr.map(e => axios.get(baseUrl+"/subscription/"+e,{
        headers: {
            Authorization: "Bearer "+ token
        }
    }))
    const res = await Promise.allSettled(subsPromises);
    const coursesIdsPrmoise = res.map(e => axios.get(baseUrl+"/courses/"+e.value.data.courseId,{
        headers: {
            Authorization: "Bearer "+ token
        }
    }))
    const courses = await Promise.allSettled(coursesIdsPrmoise)
    const data = res.map((e,i) => ({...e.value.data,courseId:courses[i].value.data}))
    return data;
})

export default SubscriptionSlice.reducer;