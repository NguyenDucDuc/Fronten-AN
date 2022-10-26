import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { authAPI, endpoints } from "../configs/API"
import "./AddSpendingGroup.scss"
import { io } from "socket.io-client"
import { socket } from "../../App"
import { useFormik } from "formik"
import * as Yup from "yup"



const AddSpendingGroup = () => {
    const [status, setStatus] = useState(null)
    const [money, setMoney] = useState()
    const [purpose, setPurpose] = useState()
    const { groupId } = useParams()
    const nav = useNavigate()
    const numberFormat = new Intl.NumberFormat('en-US')
    const formik = useFormik({
        initialValues: {
            money: null,
            purpose: ""
        },
        validationSchema: Yup.object({
            money: Yup.number().min(1000, "Số tiền phải lớn hơn 1000"),
            purpose: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {

            
            setStatus("loading")
            // kiem tra neu user id === user id đã tạo group thì add thẳng xuống db
            const currentUser = await authAPI().get(endpoints['currentUser'])
            const currentGroup = await authAPI().get(endpoints["getGroupDetail"](parseInt(groupId)))
            console.log(currentGroup.data.user.id)
            console.log(currentUser.data.id)
            if(currentUser.data.id === currentGroup.data.user.id){
                const res = await authAPI().post(endpoints['addSpendingGroup'], {
                    user_id: currentUser.data.id,
                    group_id: groupId,
                    money: values.money,
                    purpose: values.purpose,
                })
                console.log(res.data)
                setStatus("success")
                nav("/my-groups")
            }else {
                const res = await authAPI().post(endpoints["addTempSpendingGroup"], {
                    group_id: parseInt(groupId),
                    money: parseInt(values.money),
                    purpose: values.purpose
                })
                // console.log(res.data)
                setStatus("success")
                nav("/my-groups")
                // Xu ly realtime
                socket.emit("clientSendSpending", res.data)
            }
            

        }
    })


    // const addTempSpendingGroup = async (event) => {
    //     event.preventDefault()
    //     setStatus("loading")
    //     const res = await authAPI().post(endpoints["addTempSpendingGroup"], {
    //         group_id: parseInt(groupId),
    //         money: parseInt(money),
    //         purpose: purpose
    //     })
    //     // console.log(res.data)
    //     setStatus("success")
    //     nav("/my-groups")
    //     // Xu ly realtime
    //     socket.emit("clientSendSpending", res.data)
    // }

    return (
        <>
            <div className="add-spending-group">
                <form onSubmit={formik.handleSubmit}>
                    <h1>THÊM CHI TIÊU NHÓM</h1>
                    <div className="form-group">
                        <label>Số tiền: </label>
                        <input type="text" placeholder="enter your fullname" id="money" name="money" value={formik.values.money} onChange={formik.handleChange} />
                        {formik.errors.money && <p className="errMsg">{formik.errors.money}</p>}
                    </div>
                    <div className="form-group">
                        <label>Mục đích: </label>
                        <input type="text" placeholder="enter your username" id="purpose" name="purpose" value={formik.values.purpose} onChange={formik.handleChange} />
                        {formik.errors.purpose && <p className="errMsg">{formik.errors.purpose}</p>}
                    </div>
                    {status === "loading" ? <Spinner className="spinner" animation="border" variant="danger" /> : <button type="submit">Thêm</button>}
                    {/* <Spinner className="spinner" animation="border" variant="danger" /> */}
                </form>
            </div>
        </>
    )
}

export default AddSpendingGroup