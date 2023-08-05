import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {baseUrl} from "../../utils/api";
const userSlice = createSlice({
    name: "User",
    initialState: {
        value: {
            register: {},
            login: {},
            generateToken: {}
        }
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(register.fulfilled, (state,action) => {
            state.value.register = action.payload;
            state.error = null
        })
        builder.addCase(register.rejected, (state,action) => {
            state.value.register = null;
            state.error = action.error;
        })
        builder.addCase(generateToken.fulfilled, (state,action) => {
            state.value.generateToken = action.payload;
            state.error = null
        })
        builder.addCase(generateToken.rejected, (state,action) => {
            state.value.generateToken = null;
            state.error = action.error;
        })
        builder.addCase(login.fulfilled, (state,action) => {
            state.value.login = action.payload.data;
            localStorage.clear();
            const keys = Object.keys(action.payload.data);
            for (const key of keys) {
                localStorage.setItem(key, action.payload.data[key])
            }
            if(action.payload.data.token) {
                action.payload.navigate("/")
            }
            state.error = null
        })
        builder.addCase(login.rejected, (state,action) => {
            state.value.login = null;
            state.error = action.error;
        })
    }
})

export const register = createAsyncThunk("/register",async(userDetails) => {
    const {data} = await axios.post(baseUrl+"/users/register", userDetails);
    return data;
})
export const login = createAsyncThunk("/login",async({userDetails,navigate}) => {
    const {data} = await axios.post(baseUrl+"/users/login", userDetails);
    return {data,navigate};
})
export const generateToken = createAsyncThunk("/passwordReset",async(userDetails) => {
    const {data} = await axios.post(baseUrl+"/users/passwordReset", userDetails);
    return data;
})

export default userSlice.reducer;