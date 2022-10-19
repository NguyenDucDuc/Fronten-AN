import "./LoginAdmin.scss"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginAdminAsyncThunk } from "../../store/UserAdminSlice"
import { useNavigate } from "react-router-dom"
import { updatePathName } from "../../store/PathNameSlice"
import {useFormik} from "formik"
import * as Yup from "yup"
import cookies from "react-cookies"


const LoginAdmin = () => {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector(state => state.userAdmin.error)
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("required"),
            password: Yup.string().required("required")
        }),
        onSubmit: async (values) => {
            const reqBody = {
                username: values.username,
                password: values.password
            }
            const res = await dispatch(loginAdminAsyncThunk(reqBody))
            console.log(res)
            if(res.meta.requestStatus === "fulfilled"){
                cookies.save('accessTokenAdmin', res.payload.accessToken)
                nav("/admin/stats")
            }
        }
    })
    // const loginAdmin = async (event) => {
    //     event.preventDefault()
    //     const reqBody = {
    //         username: username,
    //         password: password
    //     }
    //     await dispatch(loginAdminAsyncThunk(reqBody))
    //     nav("/admin/stats")

    // }
    return (
        <>
            <div className="login-admin">
                <h1 className="title-login-admin">LOGIN ADMIN</h1>
                <div className="login-admin-error">
                    {error !== null ? <p>{error}</p> : null}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <input type="text" placeholder="username" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} />
                    {formik.errors && <p>{formik.errors.username}</p>}
                    <input type="password" placeholder="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors && <p>{formik.errors.password}</p>}
                    <button type="submit">Login</button>
                </form>

            </div>
        </>
    )
}
export default LoginAdmin