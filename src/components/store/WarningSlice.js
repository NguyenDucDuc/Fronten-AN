import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, endpoints } from "../configs/API";


export const getAllWarningAsyncThunk = createAsyncThunk("getAllWarningAsyncThunk", async () => {
    const res = await authAPI().get(endpoints["getAllWarning"])
    console.log(res.data)
    return res.data
})

export const addWarningAsyncThunk = createAsyncThunk("addWarningAsyncThunk", async (content) => {
    const res = await authAPI().post(endpoints["addWarning"], {
        content: content
    })
    return res.data
})


export const getCountWarningAsyncThunk = createAsyncThunk("getCountWarningAsyncThunk", async() => {
    const res = await authAPI().get(endpoints["countWarning"])
    
    return res.data[0].count
})


export const deleteWarningAsyncThunk = createAsyncThunk("deleteWarningAsyncThunk", async(content) => {
    const res = await authAPI().delete(endpoints["deleteWarningByContent"])
    return res.data
})

const warningSlice = createSlice({
    name: "warning",
    initialState: {
        listWarning: [],
        status: null,
        count: null
    },
    reducers: {
        refreshListWarning: (state) => {
            state.listWarning = []
        },
        getCountWarning: (state, action) => {
            state.count = action.payload;
        },
        updateListWarning: (state,action) => {
            state.listWarning = [...state.listWarning, action.payload];
        },
        refreshCountWarning: (state, action) => {
            state.count = null;
            state.listWarning = null;
            state.status = null
        }
    },
    extraReducers: {
        [getAllWarningAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [getAllWarningAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listWarning = action.payload;
        },
        [getAllWarningAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },

        [addWarningAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [addWarningAsyncThunk.fulfilled]: (state, action) => {
            state.listWarning = [...state.listWarning, action.payload];
            state.status = "success";
        },
        [addWarningAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [getCountWarningAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [getCountWarningAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.count = action.payload;
        },
        [getCountWarningAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [deleteWarningAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [deleteWarningAsyncThunk.fulfilled]: (state, action) => {
            state.listWarning = state.listWarning.filter(w => w.id !== action.payload.id);
            state.status = "success";
        },
        [deleteWarningAsyncThunk.rejected]: (state) => {
            state.status = "error";
        }

    }
})

export default warningSlice.reducer
export const {refreshListWarning, getCountWarning, updateListWarning, refreshCountWarning} = warningSlice.actions
