import axios from "axios"
import cookies from "react-cookies"

export const endpoints = {
    "register": "/api/v1/user",
    "login": "/api/v1/user/login",
    "currentUser": "/api/v1/user/current-user",
    "addIncomeSpending": "/api/v1/income-spending",
    "getTotalIncomeSpendingMonth": "/api/v1/income-spending-total-income-month" ,
    "getAllWarning": "/api/v1/warning",
    "addWarning": "/api/v1/warning",
    "getIncomeSpendingByUser": "/api/v1/get-by-user",
    "deleteIncomeSpending": (incomeSpendingId) => `/api/v1/income-spending/${incomeSpendingId}`,
    "countIncomeSpending": "/api/v1/income-spending-count",
    "totalIncomeSpending": "/api/v1/income-spending-total",
    "createGroup": "/api/v1/group",
    "deleteGroup": (groupId) => `/api/v1/group/${groupId}`,
    "getGroupByUser": "/api/v1/group",
    "getGroupDetail": (groupId) => `/api/v1/group/${groupId}`,
    "getAllUser": "/api/v1/user",
    "getUserByGroup": (groupId) => `api/v1/belong-to/${groupId}`,
    "deleteUserFromGroup": (belongToId) => `/api/v1/belong-to/${belongToId}`,
    "addMemberToGroup": (groupId) => `/api/v1/group/add-member/${groupId}`,
    "getBelongToByUser": "/api/v1/belong-to-get-by-user",
    "getBelongToByUserId": (userId) => `/api/v1/belong-to-get-group-by-user-id/${userId}`,
    "addTempSpendingGroup": "/api/v1/temp-spending-group",
    "getAllTempSpendingByGroup": (groupId) => `/api/v1/temp-spending-group/${groupId}`,
    "deleteTempSpendingGroup": (tempSpendingId) => `/api/v1/temp-spending-group/${tempSpendingId}`,
    "addSpendingGroup": "/api/v1/spending-group",
    "addMessage": "/api/v1/message-group",
    "getAllMessage": (groupId) => `/api/v1/message-group/${groupId}`,
    "countSpendingDay": "/api/v1/income-spending-count-spending-day",
    "countWarning": "/api/v1/warning-count",
    "deleteWarningByContent": "/api/v1/warning",
    "spendingGroupDetail": (groupId) => `/api/v1/spending-group-detail/${groupId}`,
    "googleUserRegister": "/api/v1/user-google",
    "googleLogin": "/api/v1/user/google-login",
    "googleLoginEmail": "/api/v1/user/google-login-email",
    "statsTotalIncomeSpending": "/api/v1/stats/total",
    "addSpendingJar": "/api/v1/income-spending-jar",
    "getAllSpendingJar": "/api/v1/income-spending-jar",
    "countSpendingJar": "/api/v1/income-spending-jar-count",
    "calcPercentJar": "/api/v1/income-spending-jar-calc",
    "deleteSpendingJar": (spendingJarId) => `/api/v1/income-spending-jar/${spendingJarId}`,
    "lockUser": (userId) => `/api/v1/user/lock/${userId}`,
    "getOneUser": (userId) => `/api/v1/user/get-one/${userId}`,
    "loginAdmin": "/api/v1/user/login-admin",
    "countAllUser": "/api/v1/user/count",
    "forgetPassword": "/api/v1/user/forget-password",
    "resetPassword": "/api/v1/user/reset-password",
    "countGroup": "/api/v1/group-count"

}

export const authAPI = () => {
    return axios.create({
        baseURL: "http://127.0.0.1:5000/",
        headers: {
            'token': `Bearer ${cookies.load('accessToken')}`
        }
    })
}

export const authAPIAdmin = () => {
    return axios.create({
        baseURL: "http://127.0.0.1:5000/",
        headers: {
            'token': `Bearer ${cookies.load('accessTokenAdmin')}`
        }
    })
}

export default axios.create({
    baseURL: "http://127.0.0.1:5000/"
})

