import "./CreateGroup.scss"
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import {useFormik} from "formik"
import * as Yup from "yup"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import cookies from "react-cookies"
import { socket } from "../../App"

const CreateGroup = () => {
    // const [groupName, setGroupName] = useState("")
    // const [purpose, setPurpose] = useState("")
    const [status, setStatus] = useState(false)
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            groupName: "",
            purpose: ""
        },
        validationSchema: Yup.object({
            groupName: Yup.string().required("Required"),
            purpose: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            try {
                setStatus(true)
                const res = await authAPI().post(endpoints["createGroup"], {
                    groupname: values.groupName,
                    purpose: values.purpose
                })
                console.log(res.data)
            
                // lay user hien tai
                const resCurrentUser = await authAPI().get(endpoints["currentUser"])
                console.log(resCurrentUser.data)
                // them user truong nhom vao nhom
                const resAddMember = await authAPI().post(endpoints["addMemberToGroup"](res.data.id), {
                    user_id: resCurrentUser.data.id,
                    group_id: res.data.id
                })
                console.log(resAddMember.data)

                 // gui nhom moi tao len server
                // socket.emit("clientSendCreateGroup", res.data)
                socket.emit("clientSendCreateGroup", {group: res.data, userId: resCurrentUser.data.id})

                // tao 1 belong to va gui len server
                const newBelongTo = {
                    user_id: resCurrentUser.data.id,
                    group_id: res.data
                }
                socket.emit('clientSendCreateBelongTo', {belongTo: newBelongTo, userId: resCurrentUser.data.id})
                setStatus(false)
            } catch (error) {
                console.log(error.response)
            }
            
        }
    })

    

    useEffect( () => {
        const checkLogin = () => {
            if(!cookies.load("accessToken")){
                nav("/login")
            }
        }
        checkLogin()
    }, [])

    const createGroup = async (event) => {
        event.preventDefault()
        
    }
    return(
        <>
            <div className="create-group">
                <form onSubmit={formik.handleSubmit}>
                    <h1>TẠO NHÓM CHI TIÊU</h1>
                    <div className="form-group">
                        <label>Tên nhóm: </label>
                        <input type="text" placeholder="enter your fullname" id="groupName" name="groupName" value={formik.values.groupName} onChange={formik.handleChange}  />
                        {formik.errors.groupName && <p className="errMsg">{formik.errors.groupName}</p>}
                    </div>
                    <div className="form-group">
                        <label>Mục đích: </label>
                        <input type="text" placeholder="enter your username" id="purpose" name="purpose" value={formik.values.purpose} onChange={formik.handleChange} />
                        {formik.errors.purpose && <p className="errMsg">{formik.errors.purpose}</p>}
                    </div>
                    {/* <button type="submit">Tạo nhóm</button> */}
                    {status === true ? <Spinner className="spinner" animation="border" variant="danger" style={{display: "flex",margin: "0px auto"}} /> : <button type="submit">Thêm</button>}
                    
                </form>
            </div>
        </>
    )
}


export default CreateGroup