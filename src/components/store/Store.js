import {configureStore} from "@reduxjs/toolkit"
import belongToReducer from "./BelongToSlice"
import groupReducer from "./GroupSlice"
import incomeSpendingReducer from "./IncomeSpendingSlice"
import messageReducer from "./MessageGroupSlice"
import PathNameSlice from "./PathNameSlice"
import spendingJarReducer from "./SpendingJarSlice"
import tempSpendingGroupReducer from "./TempSpendingGroupSlice"
import userAdminReducer from "./UserAdminSlice"
import userReducer from "./UserSlice"
import warningReducer from "./WarningSlice"


const store = configureStore({
    reducer: {
        user: userReducer,
        warning: warningReducer,
        incomeSpending: incomeSpendingReducer,
        group: groupReducer,
        belongTo: belongToReducer,
        tempSpending: tempSpendingGroupReducer,
        message: messageReducer,
        spendingJar: spendingJarReducer,
        userAdmin: userAdminReducer,
        pathName: PathNameSlice,
    }
})

export default store