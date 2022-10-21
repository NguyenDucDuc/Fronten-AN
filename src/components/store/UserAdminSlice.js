import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API, { authAPI, endpoints } from "../configs/API"
import cookies from "react-cookies"


export const loginAdminAsyncThunk = createAsyncThunk("loginAdminAsyncThunk", async (reqBody, {rejectWithValue}) => {
        
        try {
            const res = await API.post(endpoints["loginAdmin"], {
                username: reqBody.username,
                password: reqBody.password
            })
            
            return res.data
        } catch (error) {
             return rejectWithValue(error.response.data)
            // console.log(error)
        }
})


const userAdminSlice = createSlice({
    name: "userAdmin",
    initialState: {
        user: {
            fullname: '',
            avatar: ''
        },
        status: null,
        error: null
    },
    reducers: {
        updateUserAdmin: (state, action) => {
            state.user = action.payload;
        },
        logoutUserAdmin: (state, action) => {
            state.user.username = null;
            state.user.avatar = null;
        }
    },
    extraReducers: {
        [loginAdminAsyncThunk.pending]: (state,action) => {
            state.status = "loading";
        },
        [loginAdminAsyncThunk.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.status = "success";
        },
        [loginAdminAsyncThunk.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        }
    }
})

export const {updateUserAdmin, logoutUserAdmin} = userAdminSlice.actions
export default userAdminSlice.reducer