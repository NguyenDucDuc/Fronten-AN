import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, endpoints } from "../configs/API";
import {socket} from "../../App"

export const addSpendingJarAsyncThunk = createAsyncThunk("addSpendingJarAsyncThunk", async (reqbody) => {
    const res = await authAPI().post(endpoints["addSpendingJar"], {
        money: parseFloat(reqbody.money),
        purpose: reqbody.purpose,
        jar: reqbody.jar
    })
    console.log(res.data)
    // emit su kien de cap nhat real time
    socket.emit("clientSendSpendingJar", res.data)
    return res.data
})


export const getAllSpendingJar = createAsyncThunk("getAllSpendingJar", async () => {
    const res = await authAPI().get(endpoints["getAllSpendingJar"])
    return res.data
})


export const searchJarAsyncThunk = createAsyncThunk("searchJarAsyncThunk", async (url) => {
    const res = await authAPI().get(url)
    return res.data
})


export const deleteSpendingJarAsyncThunk = createAsyncThunk("deleteSpendingJarAsyncThunk", async (info) => {
    if(info.jar !== undefined){
        const res = await authAPI().delete(`${endpoints["deleteSpendingJar"](info.spendingJarId)}/?jar=${info.jar}`)
        return res.data
    }
    const res = await authAPI().delete(`${endpoints["deleteSpendingJar"](info.spendingJarId)}`)
    return res.data
})


const spendingJarSlice = createSlice({
    name: "spendingJar",
    initialState: {
        status: null,
        listSpendingJar: [],
    },
    reducers: {
        updateSpendingJar: (state,action) => {
            state.listSpendingJar = [...state.listSpendingJar, action.payload];
        }
    },
    extraReducers: {
        [addSpendingJarAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [addSpendingJarAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listSpendingJar = [...state.listSpendingJar, action.payload];
            
        },
        [addSpendingJarAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [getAllSpendingJar.pending]: (state) => {
            state.status = "loading";
        },
        [getAllSpendingJar.fulfilled]: (state, action) => {
            state.status = "success";
            state.listSpendingJar = action.payload;
            
        },
        [getAllSpendingJar.rejected]: (state) => {
            state.status = "error";
        },


        [searchJarAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [searchJarAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listSpendingJar = action.payload;
        },
        [searchJarAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [deleteSpendingJarAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [deleteSpendingJarAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listSpendingJar = action.payload;
        },
        [deleteSpendingJarAsyncThunk.rejected]: (state) => {
            state.status = "error";
        }
    }
})

export default spendingJarSlice.reducer
export const {updateSpendingJar} = spendingJarSlice.actions