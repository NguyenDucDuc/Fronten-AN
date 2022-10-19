import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, endpoints } from "../configs/API";


export const addIncomeSpendingAsyncThunk = createAsyncThunk("addIncomeSpendingAsyncThunk", async (requestBody, {rejectWithValue}) => {
    
    try {
        const res = await authAPI().post(endpoints["addIncomeSpending"], {
            money: requestBody.money,
            purpose: requestBody.purpose,
            type: requestBody.type,
        })
        console.log(res.data)
        
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
    
})

export const getAllIncomeSpendingThunk = createAsyncThunk("getAllIncomeSpendingThunk", async () => {
    const res = await authAPI().get(`${endpoints["getIncomeSpendingByUser"]}/?pageSize=${2}&page=${1}`)
    return res.data
})

export const deleteIncomeSpendingAsyncThunk = createAsyncThunk("deleteIncomeSpendingAsyncThunk", async (info) => {
    // const res = await authAPI().delete(endpoints["deleteIncomeSpending"](info.incomeSpendingId))
    const res = await authAPI().delete(`${endpoints["deleteIncomeSpending"](info.incomeSpendingId)}/?type=${info.type}`)
    return res.data
})


export const searchIncomeSpendingAsyncThunk = createAsyncThunk("searchIncomeSpendingAsyncThunk", async (url) => {
        const res = await authAPI().get(url)
        return res.data
})






const incomeSpendingSlice = createSlice({
    name: "incomeSpending",
    initialState: {
        listIncomeSpendings: [],
        status: null,
        error: null
    },
    reducers: {
        updateErr: (state, action) => {
            state.error = action.payload;
        },
        updateIncomeSpending: (state, action) => {
            state.listIncomeSpendings = [...state.listIncomeSpendings, action.payload];
        },
        updateIncomeSpendingAfterDeleted: (state, action) => {
            state.listIncomeSpendings = action.payload;
        }
    },
    extraReducers: {
        [addIncomeSpendingAsyncThunk.pending]: (state) => {
            state.status = "loading";
        }, 
        [addIncomeSpendingAsyncThunk.fulfilled]: (state) => {
            state.status = "success";
        },
        [addIncomeSpendingAsyncThunk.rejected]: (state,action) => {
            state.status = "error";
            state.error = action.payload;
        },

        [getAllIncomeSpendingThunk.pending]: (state) => {
            state.status = "loading";
        },
        [getAllIncomeSpendingThunk.fulfilled]: (state,action) => {
            state.status = "success";
            state.listIncomeSpendings = action.payload;
        },
        [getAllIncomeSpendingThunk.rejected]: (state) => {
            state.status = "error";
        },


        [deleteIncomeSpendingAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [deleteIncomeSpendingAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listIncomeSpendings = action.payload;
        },
        [deleteIncomeSpendingAsyncThunk.rejected]: (state) => {
            state.status = "error";
        },


        [searchIncomeSpendingAsyncThunk.pending]: (state) => {
            state.status = "loading";
        },
        [searchIncomeSpendingAsyncThunk.fulfilled]: (state, action) => {
            state.status = "success";
            state.listIncomeSpendings = action.payload;
        },
        [searchIncomeSpendingAsyncThunk.rejected]: (state,action) => {
            state.status = "error";
        },
    }
})

export default incomeSpendingSlice.reducer
export const {updateErr, updateIncomeSpending,updateIncomeSpendingAfterDeleted} = incomeSpendingSlice.actions