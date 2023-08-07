import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/api";

const addressSlice = createSlice({
  name: "Address",
  initialState: {
    value: {
      addresses: [],
      addAddress: {},
    },
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.value.addresses = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.value.addresses = [];
      state.error = action.error;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.value.addAddress = action.payload;
      state.error = null;
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.value.addAddress = [];
      state.error = action.error;
    });
  },
});

export const fetchAddress = createAsyncThunk("/fetchAddress", async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(baseUrl + "/address/usersAddr", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
});
export const addAddress = createAsyncThunk("/addAddress", async ({addressInp,dispatch}) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(baseUrl + "/address/add", addressInp, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  dispatch(fetchAddress());
  return data;
});

export default addressSlice.reducer;
