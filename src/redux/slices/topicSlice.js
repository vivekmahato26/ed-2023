import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/api";

const TopicSlice = createSlice({
    name:"Topic",
    initialState: {
        value: {
            addTopic: {},
            topics: []
        }
    },
    reducers:{},
    extraReducers:builder => {
        builder.addCase(addTopic.fulfilled, (state,action) => {
            state.value.addTopic = action.payload;
            state.value.error = null
        })
        builder.addCase(addTopic.rejected, (state,action) => {
            state.value.addTopic = {};
            state.value.error = action.error
        })
        builder.addCase(getTopic.rejected, (state,action) => {
            state.value.topics = [];
            state.value.error = action.error
        })
        builder.addCase(getTopic.fulfilled, (state,action) => {
            state.value.topics = action.payload;
            state.value.error = null
        })
    }
})

export const addTopic = createAsyncThunk("/addTopic", async(TopicData) => {
    const token = localStorage.getItem("token");
    const {data} = await axios.post(baseUrl+"/topic/add",TopicData,{
        headers: {
            Authorization: "Bearer "+ token
        }
    })
    return data;
})
export const getTopic = createAsyncThunk("/getTopic", async(topicId) => {
    const token = localStorage.getItem("token");
    const {data} = await axios.get(baseUrl+"/topic/"+topicId,{
        headers: {
            Authorization: "Bearer "+ token
        }
    })
    return data;
})

export default TopicSlice.reducer;