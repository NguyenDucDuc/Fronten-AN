import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { endpoints } from "../configs/API";
import cookies from "react-cookies"
import axios from "axios";
import {socket} from '../../App'


export const loginAsyncThunk = createAsyncThunk("loginAsyncThunk", async (reqBody, {rejectWithValue} ) => {
    try {
        const res = await API.post(endpoints["login"], {
            username: reqBody.username,
            password: reqBody.password.toString()
        })
        console.log(res.data)
        if (res.data.accessToken) {
            cookies.save("accessToken", res.data.accessToken)
        }
        // join vao room
        socket.emit('login', res.data.user.id)
        return res.data.user
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
    
})

export const loginGoogleAsyncThunk = createAsyncThunk("loginGoolgeAsyncThunk", async (tokenResponse) => {
    // call api cua google de lay thong tin user
    const info = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
        }
    })
    console.log(info)

    // get or create 1 user moi voi thong tin vua lay duoc
    const res = await API.post(endpoints["googleLogin"], {
        username: info.data.email,
        fullname: info.data.name,
        email: info.data.email,
        avatar: info.data.picture
    })
    console.log(res.data)
    
    // dung user moi dang nhap vao he thong de lay access token, tu do su dung cac chuc nang
    const resLogin = await API.post(endpoints["googleLoginEmail"], {
        username: res.data.username,
        email: res.data.email
    })
    console.log("resLogin", resLogin.data)
    if (resLogin.data.accessToken) {
        cookies.save("accessToken", resLogin.data.accessToken)
    }
    return resLogin.data.user
})



const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            fullname: null,
            username: null,
        },
        status: null,
        error: null,
    },
    reducers: {
        logoutReducer: (state) => {
            state.user.username = null;
            state.user.fullname = null;
        },
        updateUsername: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [loginAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [loginAsyncThunk.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = "success";
        },
        [loginAsyncThunk.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

        [loginGoogleAsyncThunk.pending]: (state) => {
            state.status = "loading"
        },
        [loginGoogleAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.user.fullname = action.payload.fullname;
        },
        [loginGoogleAsyncThunk.rejected]: (state) => {
            state.status = "error";
        }
    }
})

export default userSlice.reducer
export const { logoutReducer, updateUsername } = userSlice.actions