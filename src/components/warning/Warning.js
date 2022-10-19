import "./Warning.scss"
import { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getAllWarningAsyncThunk, updateListWarning } from "../store/WarningSlice"
import { socket } from "../../App"
import CardWarning from "./cardWarning/CardWarning"
import { useNavigate } from "react-router-dom"
import cookies from "react-cookies"

const Warning = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const warning = useSelector(state => state.warning.listWarning)

    useEffect(() => {
        const loadWarning = async () => {
            dispatch(getAllWarningAsyncThunk())
        }
        const checkLogin = () => {
            if(!cookies.load("accessToken")){
                nav("/login")
            }
        }
        checkLogin()
        loadWarning()
    }, [])

    useEffect( () => {
        socket.off("serverReSendWarning").on("serverReSendWarning", data => {
            dispatch(updateListWarning(data))
            
        })
    }, [socket])
    
    return (
        <>
            <h1 className="" style={{textAlign: "center", color:"#ff0066",fontWeight:"bold", marginTop:"50px"}}>CẢNH BÁO NGƯỜI DÙNG</h1>
            <div className="warning">
                { warning !== null && warning.map(m => <CardWarning content={m.content} />)}
            </div>
            
        </>
    )
}

export default Warning