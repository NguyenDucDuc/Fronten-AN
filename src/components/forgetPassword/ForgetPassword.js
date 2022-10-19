import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API, { endpoints } from "../configs/API"
import "./ForgetPassword.scss"
import {Spinner} from "react-bootstrap"


const ForgetPassword = () => {
    const [username, setUsername] = useState("")
    const [otp, setOtp] = useState("")
    const [otpRes, setOtpRes] = useState()
    const [showInput, setShowInput] = useState(false)
    const [error, setError] = useState()
    const [newPass, setNewPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const [showResetPass, setShowResetPass] = useState(false)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()
    const forgetPasswordHandle = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const res = await API.post(endpoints["forgetPassword"], {
                username: username
            })
            setLoading(false)
            console.log(res.data)
            if (res.data) {
                setUser(res.data.user)
                setShowInput(true)
                setOtpRes(res.data.OTP)
                setError("")
            }
        } catch (error) {
            console.log(error.response.data)
            setError(error.response.data)
        }


    }

    const otpHandle = (event) => {
        event.preventDefault()
        if (otpRes === otp) {
            setShowResetPass(true)
        }
    }

    const resetPassHandle = async (event) => {
        event.preventDefault()
        
        if(newPass === confirm){
            const res = await API.post(endpoints["resetPassword"], {
                userId: user.id,
                password: newPass
            })
            if(res.data){
                nav("/login")
            }
        }
        
    }
    return (
        <>
            {
                showResetPass === false ?
                    <div className="forget-password">

                        <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Nhập tên người dùng" />

                        <button onClick={forgetPasswordHandle} disabled={showInput}>Send</button>
                        {error !== undefined ? <p>{error}</p> : null}
                        {
                            showInput === true ?
                                <input type="text" placeholder="Nhap OTP" onChange={e => setOtp(e.target.value)} />
                                : null
                        }
                        {
                            showInput === true ?
                                <button onClick={otpHandle} >OK OTP</button>
                                : null
                        }
                    </div>
                    : null
            }
            {
                loading === true ?
                <Spinner animation="border" variant="success" style={{display: "flex", margin:"0 auto", marginTop: "20px"}} />
                : null
            }
            {
                showResetPass === true ?
                    <div className="reset-password">
                        <input type="password" onChange={e => setNewPass(e.target.value)} placeholder="Nhập mật khẩu mới" />
                        <input type="password" onChange={e => setConfirm(e.target.value)} placeholder="Xác nhận mật khẩu" />
                        <button onClick={resetPassHandle} >Đặt lại</button>
                    </div>
                    : null
            }


        </>
    )
}

export default ForgetPassword