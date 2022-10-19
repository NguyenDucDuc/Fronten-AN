import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, endpoints } from "../configs/API";


export const getAllTempSpendingAsyncThunk = createAsyncThunk("getAllTempSpendingAsyncThunk", async (groupId) => {
    const res = await authAPI().get(endpoints["getAllTempSpendingByGroup"](groupId))
    return res.data
})


export const deleteTempSpendingAsyncThunk = createAsyncThunk("deleteTempSpendingAsyncThunk", async (tempSpendingId) => {
    const res = await authAPI().delete(endpoints["deleteTempSpendingGroup"](tempSpendingId))
    return res.data
})

export const addTempSpendingAsyncThunk = createAsyncThunk("addTempSpendingAsyncThunk", async (reqBody) => {
    const res = await authAPI().post(endpoints["addTempSpendingGroup"], {
        group_id: parseInt(reqBody.groupId),
        user_id: parseInt(reqBody.userId),
        money: parseInt(reqBody.money),
        purpose: reqBody.purpose
    })
    console.log(res.data)
    // return res.data
})


const tempSpendingGroupSlice = createSlice({
    name: "tempSpendingGroup",
    initialState: {
        listTempSpendings: [],
        status: null,
    },
    reducers: {
        updateListTempSpendings: (state,action) => {
            state.listTempSpendings = [...state.listTempSpendings, action.payload];
        }
    },
    extraReducers: {
        [getAllTempSpendingAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [getAllTempSpendingAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listTempSpendings = action.payload;
        },
        [getAllTempSpendingAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [deleteTempSpendingAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [deleteTempSpendingAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listTempSpendings = action.payload;
        },
        [deleteTempSpendingAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [addTempSpendingAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [addTempSpendingAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listTempSpendings = [...state.listTempSpendings, action.payload];
        },
        [addTempSpendingAsyncThunk.rejected]: (state) => {
            state.status = "error";
        }
    }
})

export default tempSpendingGroupSlice.reducer
export const {updateListTempSpendings} = tempSpendingGroupSlice.actions