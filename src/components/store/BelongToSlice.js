import { useParams } from "react-router-dom";
import { authAPI, endpoints } from "../configs/API";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getAllBelongToByGroupAsyncThunk = createAsyncThunk("getAllBelongToByGroupAsyncThunk", async (groupId) => {
    
    const res = await authAPI().get(endpoints["getUserByGroup"](groupId))
    console.log(res.data)
    
    return res.data
})


export const deleteUserFromGroupAsyncThunk = createAsyncThunk("deleteUserFromGroupAsyncThunk", async(belongToId) => {
    const res = await authAPI().delete(endpoints["deleteUserFromGroup"](belongToId))
    return res.data
})

export const addMemberToGroupAsyncThunk = createAsyncThunk("addMemberToGroupAsyncThunk", async (reqBody) => {
    const res = await authAPI().post(endpoints["addMemberToGroup"](reqBody.groupId), {
        user_id: reqBody.userId,
        group_id: reqBody.groupId
    })
    console.log(res.data)
    return res.data
})

export const getAllBelongToByUserAsyncThunk = createAsyncThunk("getAllBelongToByUserAsyncThunk", async(url) => {
    const res = await authAPI().get(url)
    return res.data
})




const belongToSlice = createSlice({
    name: "belongTo",
    initialState: {
        listBelongTos: [],
        status: null
    }, 
    reducers: {
        addBelongTo: (state, action) => {
            state.listBelongTos = [...state.listBelongTos, action.payload];
        }
    },
    extraReducers: {
        [getAllBelongToByGroupAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [getAllBelongToByGroupAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listBelongTos = action.payload;
        },
        [getAllBelongToByGroupAsyncThunk.rejected]: (state) => {
            state.state = "error";
        },


        [deleteUserFromGroupAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [deleteUserFromGroupAsyncThunk.fulfilled]: (state,action) => {
            state.status = "success";
            state.listBelongTos = action.payload;
        },
        [deleteUserFromGroupAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [addMemberToGroupAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [addMemberToGroupAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listBelongTos = action.payload;
        },
        [addMemberToGroupAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },

        [getAllBelongToByUserAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [getAllBelongToByUserAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listBelongTos = action.payload;
        },
        [getAllBelongToByUserAsyncThunk.rejected]: (state) => {
            state.status = "error";
        }
    }
})

export default belongToSlice.reducer
export const {addBelongTo} = belongToSlice.actions