import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { endpoints } from "../configs/API";
import cookies from "react-cookies"
import axios from "axios";


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
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
    
})

export const loginGoogleAsyncThunk = createAsyncThunk("loginGoolgeAsyncThunk", async (tokenResponse) => {
    const info = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
        }
    })
    console.log(info)
    const res = await API.post(endpoints["googleLogin"], {
        username: info.data.email,
        fullname: info.data.name,
        email: info.data.email,
        avatar: info.data.picture
    })
    console.log(res.data)

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
        username: null,
        status: null,
        error: null
    },
    reducers: {
        logoutReducer: (state) => {
            state.username = null;
        },
        updateUsername: (state, action) => {
            state.username = action.payload;
        }
    },
    extraReducers: {
        [loginAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [loginAsyncThunk.fulfilled]: (state, action) => {
            state.username = action.payload.user.username;
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
            state.username = action.payload.fullname;
        },
        [loginGoogleAsyncThunk.rejected]: (state) => {
            state.status = "error";
            
        }
    }
})

export default userSlice.reducer
export const { logoutReducer, updateUsername } = userSlice.actions