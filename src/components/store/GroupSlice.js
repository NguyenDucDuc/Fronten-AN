import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI, endpoints } from "../configs/API";


export const getAllGroupAsyncThunk = createAsyncThunk("getAllGroupAsyncThunk", async (url) => {
    // const res = await authAPI().get(endpoints["getGroupByUser"])
    const res = await authAPI().get(url)
    console.log(res.data)
    return res.data
})


export const deleteGroupAsyncThunk = createAsyncThunk("deleteGroupAsyncThunk", async (groupId) => {
    const res = await authAPI().delete(endpoints["deleteGroup"](groupId))
    return res.data
})


const groupSlice = createSlice({
    name: "group",
    initialState: {
        listGroups: [],
        status: null,
    },
    reducers: {
        updateListGroups: (state, action) => {
            state.listGroups = [...state.listGroups, action.payload];
        },
        updateAfterDeletedGroup: (state, action) => {
            state.listGroups = action.payload;
        }
    },
    extraReducers: {
        [getAllGroupAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [getAllGroupAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listGroups = action.payload;
        },
        [getAllGroupAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [deleteGroupAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [deleteGroupAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listGroups = action.payload;
        },
        [deleteGroupAsyncThunk.rejected]: (state) => {
            state.status = "error";
        }
    }
    
})

export default groupSlice.reducer
export const {updateListGroups,updateAfterDeletedGroup} = groupSlice.actions