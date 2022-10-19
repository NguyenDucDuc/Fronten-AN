import {createSlice} from "@reduxjs/toolkit"


const pathNameSlice = createSlice({
    name: "pathName",
    initialState: {
        pathName: "/"
    },
    reducers: {
        updatePathName: (state, action) => {
            state.pathName = action.payload;
        }
    }
})

export default pathNameSlice.reducer
export const {updatePathName} = pathNameSlice.actions