import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/api";

const courseSlice = createSlice({
    name:"Course",
    initialState: {
        value: {
            addCourse: {},
            courses: [],
            courseDetails: {}
        }
    },
    reducers:{},
    extraReducers:builder => {
        builder.addCase(addCourse.fulfilled, (state,action) => {
            state.value.addCourse = action.payload;
            state.value.error = null
        })
        builder.addCase(addCourse.rejected, (state,action) => {
            state.value.addCourse = {};
            state.value.error = action.error
        })
        builder.addCase(getAllCourses.rejected, (state,action) => {
            state.value.courses = [];
            state.value.error = action.error
        })
        builder.addCase(getAllCourses.fulfilled, (state,action) => {
            state.value.courses = action.payload;
            state.value.error = null
        })
        builder.addCase(courseDetails.rejected, (state,action) => {
            state.value.courseDetails = [];
            state.value.error = action.error
        })
        builder.addCase(courseDetails.fulfilled, (state,action) => {
            state.value.courseDetails = action.payload;
            state.value.error = null
        })
    }
})

export const addCourse = createAsyncThunk("/addCourse", async(courseData) => {
    const token = localStorage.getItem("token");
    const {data} = await axios.post(baseUrl+"/courses/add",courseData,{
        headers: {
            Authorization: "Bearer "+ token
        }
    })
    return data;
})
export const getAllCourses = createAsyncThunk("/getAllCourses", async() => {
    const token = localStorage.getItem("token");
    const {data} = await axios.get(baseUrl+"/courses/all",{
        headers: {
            Authorization: "Bearer "+ token
        }
    })
    return data;
})


export const courseDetails = createAsyncThunk("/getCourse", async(courseId) => {
    const token = localStorage.getItem("token");
    const {data} = await axios.get(baseUrl+"/courses/"+courseId,{
        headers: {
            Authorization: "Bearer "+ token
        }
    })
    return data;
})

export default courseSlice.reducer;