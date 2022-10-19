
import { useRef, useState } from "react"
import API, { endpoints } from "../configs/API"
import {useNavigate} from "react-router-dom"
import "./Register.scss"
import {useFormik} from "formik"
import * as Yup from "yup"
import { Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"

const Register = () => {
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const [fullname, setFullname] = useState("")
    // const [confirm, setConfirm] = useState("")
    const [email, setEmail] = useState("")
    const avatar = useRef();
    const [role, setRole] = useState("USER")
    const nav = useNavigate()
    const [status, setStatus] = useState("")

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            fullname: "",
            confirm: "",
            email: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            confirm: Yup.string().required("Required"),
            fullname: Yup.string().required('Requierd'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append("fullname", values.fullname)
            formData.append("username", values.username)
            formData.append("password", values.password)
            formData.append("email", email)
            formData.append("role", role)
            formData.append("avatar", avatar.current.files[0])
            console.log(formData.get('avatar'))
            if(values.password === values.confirm) {
                setStatus("loading")
                const res = await API.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                setStatus("success")
                console.log(res.data)
                nav("/")
            }
            
        }
    })

    const register = (event) => {
        event.preventDefault()

        let registerUser = async () => {
            // const formData = new FormData()
            // formData.append("fullname", fullname)
            // formData.append("username", username)
            // formData.append("password", password)
            // formData.append("email", email)
            // formData.append("avatar", avatar.current.files[0])
            // console.log(formData.get('avatar'))

            // const res = await API.post(endpoints['register'], formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data"
            //     }
            // })

            // console.log(res.data)
            // nav("/")
        }
        // if (password !== null && password === confirm) {
        //     registerUser()
            
        // }
    }
    return (
        <>
            <div className="register">
                <form onSubmit={formik.handleSubmit}>
                    <h1>ĐĂNG KÝ</h1>
                    <div className="form-group">
                        <label>Full name: </label>
                        <input type="text" placeholder="enter your fullname" id="fullname" name="fullname" value={formik.values.fullname} onChange={formik.handleChange} />
                        {formik.errors.fullname && <p className="errMsg">{formik.errors.fullname}</p>}
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" placeholder="enter your username" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} />
                        {formik.errors.username && <p className="errMsg">{formik.errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" placeholder="enter your password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                        {formik.errors.password && <p className="errMsg">{formik.errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label>Confirm password: </label>
                        <input type="password" placeholder="enter your password" id="confirm" name="confirm" value={formik.values.confirm} onChange={formik.handleChange} />
                        {formik.errors.confirm && <p className="errMsg">{formik.errors.confirm}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" placeholder="enter your email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Select role: </label>
                        <select value={role} onChange={e => setRole(e.target.value)}>
                            <option value="USER">USER</option>
                            <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Choose avatar: </label>
                        <input type="file" ref={avatar} />
                    </div>
                    
                    {/* <button type="submit">Đăng ký</button> */}
                    {status === "loading" ? <Spinner className="spinner" animation="border" variant="danger" /> : <button type="submit">Đăng ký</button>}
                </form>
            </div>
        </>
    )
}

export default Register