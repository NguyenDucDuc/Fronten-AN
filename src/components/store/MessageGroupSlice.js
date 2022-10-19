import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, endpoints } from "../configs/API";


export const getAllMessageAsyncThunk = createAsyncThunk("getAllMessageAsyncThunk", async(groupId) => {
    const res = await authAPI().get(endpoints["getAllMessage"](groupId))
    console.log(res.data)
    return res.data
})


const messageGroupSlice = createSlice({
    name: "messageGroup",
    initialState: {
        listMessages: [],
        status: null
    },
    reducers: {
        addMessage: (state, action) => {
            state.listMessages = [...state.listMessages, action.payload];
        }
    },
    extraReducers: {
        [getAllMessageAsyncThunk.pending]: (state, action) => {
            state.status = "loading";
        },
        [getAllMessageAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listMessages = action.payload;
        },
        [getAllMessageAsyncThunk.rejected]: (state) => {
            state.status = "error";
        }
    }
})

export default messageGroupSlice.reducer
export const {addMessage} = messageGroupSlice.actions