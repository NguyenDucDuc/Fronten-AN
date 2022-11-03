import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API, { authAPI, endpoints } from "../configs/API"
import { useDispatch, useSelector } from "react-redux"

import { loginAsyncThunk, loginFacebookAsyncThunk, loginGoogleAsyncThunk } from "../store/UserSlice"
import cookies from "react-cookies"
import { getAllWarningAsyncThunk, getCountWarningAsyncThunk } from "../store/WarningSlice"
import { Spinner } from "react-bootstrap"
import "./Login.scss"
import { useFormik } from "formik"
import * as Yup from "yup"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import { gapi } from "gapi-script"
import jwt_decode from "jwt-decode"
import axios from "axios"
import { updateErr } from "../store/IncomeSpendingSlice"
import { socket } from "../../App"
import FacebookLogin from 'react-facebook-login'
import { loginAdminAsyncThunk } from "../store/UserAdminSlice"

const Login = () => {

    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const [errMsg, setErrMsg] = useState()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const status = useSelector(state => state.user.status)
    const error = useSelector(state => state.user.error)

    useEffect(() => {
        console.log(cookies.load('OTP'))
    }, [])



    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            const reqBody = {
                username: values.username,
                password: values.password
            }
            const resLogin = await dispatch(loginAsyncThunk(reqBody))
            if (resLogin.meta.requestStatus === "fulfilled") {
                const accessToken = cookies.load("accessToken")
                console.log(accessToken)
                if (accessToken) {
                    //dem tat ca thong bao
                    dispatch(getCountWarningAsyncThunk())
                    // lay tat ca thong bao de hien thi
                    dispatch(getAllWarningAsyncThunk())
                    //set error thanh null
                    dispatch(updateErr(null))

                    nav("/")
                }
            }

        }
    })

    const login = async (event) => {
        event.preventDefault()
        //kiem tra field
        // if (username !== "" && password !== "") {
        //     await dispatch(loginAsyncThunk(username, password))
        //     // const res = await API.post(endpoints["login"], {
        //     //     username: username,
        //     //     password: password
        //     // })
        //     // console.log(res.data)
        //     await dispatch(getAllWarningAsyncThunk())
        //     const accessToken = cookies.load("accessToken")
        //     console.log(accessToken)
        //     if (accessToken) {
        //         dispatch(getCountWarningAsyncThunk())
        //         nav("/")
        //     }
        // }

    }

    const onSuccess = (res) => {
        console.log("success", res)
        const info = jwt_decode(res.credential)
        console.log(info)
    }

    const onFailure = (res) => {
        console.log("failure", res)
    }

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse)
            // const info = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            //     headers: {
            //         "Authorization": `Bearer ${tokenResponse.access_token}`
            //     }
            // })
            // console.log(info)
            await dispatch(loginGoogleAsyncThunk(tokenResponse))
            nav("/")
        },
    });

    const responseFacebook = async (response) => {
        console.log(response)
        //  const res = await API.get(`https://graph.facebook.com/${response.id}?fields=id,name,email,picture&access_token=${response.accessToken}`)
        //  console.log(res.data)
        const reqBody = {
            username: response.id,
            fullname: response.name,
            email: response.email,
            avatar: response.picture.data.url
        };
        const valueDispatch = await dispatch(loginFacebookAsyncThunk(reqBody));
        console.log(valueDispatch);
        if(valueDispatch.payload.accessToken){
            cookies.save('accessToken', valueDispatch.payload.accessToken);
            nav("/");
        }
       
    }
    return (
        <>


            <div id="signInDiv"></div>
            {status === "loading" ?
                <div className="login-ring">
                    <div className="ring">

                    </div>
                </div> :
                <div className="login">
                    <form onSubmit={formik.handleSubmit}>
                        <h1>ĐĂNG NHẬP</h1>
                        <div className="error">
                            {error !== null ? <p>{error}</p> : null}
                        </div>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text" placeholder="enter your username" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} />
                            {formik.errors.username && <p className="errMsg">{formik.errors.username}</p>}
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="password" placeholder="enter your password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password && (<p className="errMsg">{formik.errors.password}</p>)}
                        </div>

                        <p className="link-to-register"><Link to="/forget-password">Quên mật khẩu</Link></p>
                        <p className="link-to-register">Bạn chưa có tài khoản ? <Link to="/register">Đăng ký</Link></p>

                        <button type="button" onClick={loginGoogle}><i class="fa-brands fa-google"></i>Google</button>
                        <button type="submit">Đăng nhập</button>
                        <FacebookLogin
                            appId="576726474216580"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook} />
                    </form>
                </div>
            }


        </>
    )
}

export default Login