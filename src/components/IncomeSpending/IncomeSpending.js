import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authAPI, endpoints } from "../configs/API"
import "./IncomeSpending.scss"
import { useDispatch, useSelector } from "react-redux"
import { socket } from "../../App"
import { addWarningAsyncThunk, deleteWarningAsyncThunk, getCountWarning, getCountWarningAsyncThunk } from "../store/WarningSlice"
import { addIncomeSpendingAsyncThunk } from "../store/IncomeSpendingSlice"
import { Spinner } from "react-bootstrap"
import { useFormik, yupToFormErrors } from "formik"
import * as Yup from "yup"
import cookies from "react-cookies"

const IncomeSpending = () => {
    // const [money, setMoney] = useState()
    // const [purpose, setPurpose] = useState("")
    const [selected, setSelected] = useState("SPENDING")
    const status = useSelector(state => state.incomeSpending.status)
    const warning = useSelector(state => state.warning.listWarning)
    const error = useSelector(state => state.incomeSpending.error)
    const nav = useNavigate()
    useEffect(() => {
        const accessToken = cookies.load("accessToken")
        if (!accessToken) {
            nav("/login")
        }
    }, [])
    // join vao phong de emit
    

    const formik = useFormik({
        initialValues: {
            money: "",
            purpose: "",
        },
        validationSchema: Yup.object({
            money: Yup.number().required("Required").min(1000, "Số tiền phải từ 1.000 VND"),
            purpose: Yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            try {
                const currentUser = await authAPI().get(endpoints['currentUser'])
                const requestBody = {
                    money: parseFloat(values.money),
                    purpose: values.purpose,
                    type: selected
                }
                // dispatch de add income spending
                const res = await dispatch(addIncomeSpendingAsyncThunk(requestBody))
                console.log(res)
                // gui income spending len server de cap nhat realtime
                // socket.emit("clientSendIncomeSpending", res.payload)
                socket.emit("clientSendIncomeSpending", {incomeSpending: res.payload, userId: currentUser.data.id})
                // if(selected === "INCOME")
                //     dispatch(addWarningAsyncThunk(`Thu nhập của bạn vừa tăng ${res.payload.money} VND`))
                // else 
                //     dispatch(addWarningAsyncThunk(`Chi tiêu của bạn vừa tăng ${res.payload.money} VND`))

                
                // console.log(resCountSpendingDay.data)

                const resTotalMonth = await authAPI().get(endpoints["getTotalIncomeSpendingMonth"])
                if (resTotalMonth.data.totalIncomeMonth === null) {
                    resTotalMonth.data.totalIncomeMonth = 0
                }
                if (resTotalMonth.data.totalSpendingMonth === null) {
                    resTotalMonth.data.totalSpendingMonth = 0
                }
                // kiem tra tong thu nhap thang < tong chi tieu thang thi gui thong bao
                if (resTotalMonth.data.totalIncomeMonth < resTotalMonth.data.totalSpendingMonth) {
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    const res = await dispatch(addWarningAsyncThunk(`Thu nhập của bạn đang ít hơn chi tiêu`))
                    if (res.payload) {
                        socket.emit("clientSendWarning", {warning: res.payload, userId: currentUser.data.id})
                    }
                    //dem cac canh bao de hien thi ra header
                    dispatch(getCountWarningAsyncThunk())
                }

                // neu thu nhap lon hon thi lai xoa thong bao di
                if (resTotalMonth.data.totalIncomeMonth > resTotalMonth.data.totalSpendingMonth) {
                    dispatch(deleteWarningAsyncThunk("Thu nhập của bạn đang ít hơn chi tiêu"))
                }

                // kiem tra neu chi tieu trong ngay nhieu thi add thong bao.
                const resCountSpendingDay = await authAPI().get(endpoints["countSpendingDay"])

                if (resCountSpendingDay.data.countSpendingDay > 1) {
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);
                    const res = await dispatch(addWarningAsyncThunk(`Chi tiêu của bạn ngày ${today.toISOString().split("T")[0]} quá nhiều, hãy cân nhắc`))
                    console.log(res)
                    if (res.payload) {
                        socket.emit("clientSendWarning", {warning: res.payload, userId: currentUser.data.id})
                    }
                    //dem cac canh bao de hien thi ra header
                    dispatch(getCountWarningAsyncThunk())
                }


                // kiem tra tong thu nhap va chi tieu cua thang neu chi tieu lon hon thu nhap thi them 1 canh bao


            } catch (error) {
                console.log(error)
            }
        }
    })

    const dispatch = useDispatch()

    const addIncomeSpending = async (event) => {
        event.preventDefault()
        // if (money !== null && purpose !== null && selected !== null && purpose !== "") {
        //     try {
        //         console.log(money + "," + purpose + "," + selected + "chua truyen")
        //         const requestBody = {
        //             money: money,
        //             purpose: purpose,
        //             type: selected
        //         }
        //         // dispatch de add income spending
        //         const res = await dispatch(addIncomeSpendingAsyncThunk(requestBody))
        //         console.log(res)
        //         // gui income spending len server de cap nhat realtime
        //         socket.emit("clientSendIncomeSpending", res.payload)
        //         // if(selected === "INCOME")
        //         //     dispatch(addWarningAsyncThunk(`Thu nhập của bạn vừa tăng ${res.payload.money} VND`))
        //         // else 
        //         //     dispatch(addWarningAsyncThunk(`Chi tiêu của bạn vừa tăng ${res.payload.money} VND`))
        //         const resCountSpendingDay = await authAPI().get(endpoints["countSpendingDay"])
        //         if (resCountSpendingDay.data[0].countSpendingDay > 1) {
        //             const timeElapsed = Date.now();
        //             const today = new Date(timeElapsed);
        //             const res = await dispatch(addWarningAsyncThunk(`Chi tiêu của bạn ngày ${today.toISOString().split("T")[0]} quá nhiều, hãy cân nhắc`))
        //             if (res.payload) {
        //                 socket.emit("clientSendWarning", res.payload)
        //             }
        //         }
        //         // kiem tra tong thu nhap va chi tieu cua thang neu chi tieu lon hon thu nhap thi them 1 canh bao
        //         const resTotalMonth = await authAPI().get(endpoints["getTotalIncomeSpendingMonth"])

        //         if(resTotalMonth.data.totalIncomeMonth > resTotalMonth.data.totalSpendingMonth) {
        //             dispatch(addWarningAsyncThunk(`Thu nhập của bạn đang ít hơn chi tiêu`))
        //         }
        //         //dem cac canh bao de hien thi ra header
        //         // const resCountWarning = await authAPI().get(endpoints["countWarning"]) 
        //         // dispatch(getCountWarning(resCountWarning.data[0].count))
        //         dispatch(getCountWarningAsyncThunk())
        //     } catch (error) {
        //         console.log(error)
        //     }
        //     const res = await authAPI().post(endpoints["addIncomeSpending"], {
        //         money: parseInt(money),
        //         purpose: purpose,
        //         type: selected
        //     })
        //     console.log(res.data)
        //     if(selected === "INCOME"){
        //         dispatch(addWarningAsyncThunk(`Thu nhập của bạn vừa tăng ${res.data.money} VND`))
        //     }
        //     if(selected === "SPENDING"){
        //         dispatch(addWarningAsyncThunk(`Thu nhập của bạn vừa giảm ${res.data.money} VND`))
        //     }
        // }
    }

    return (
        <>
            <div className="add-income-spending">
                <form onSubmit={formik.handleSubmit} >
                    <h1>THÊM THU CHI</h1>
                    <div className="err">
                        {error !== null ? <p>{error}</p> : null}
                    </div>
                    <div className="form-group">
                        <label>Số tiền: </label>
                        <input type="text" placeholder="nhập số tiền VND" id="money" name="money" value={formik.values.money} onChange={formik.handleChange} />
                        {formik.errors.money && <p className="errMsg">{formik.errors.money}</p>}
                    </div>
                    <div className="form-group">
                        <label>Mục đích: </label>
                        <input type="text" placeholder="nhập mục đích" id="purpose" name="purpose" value={formik.values.purpose} onChange={formik.handleChange} />
                        {formik.errors.purpose && <p className="errMsg">{formik.errors.purpose}</p>}
                    </div>
                    <div className="form-group">
                        <label>Chọn loại: </label>
                        <select value={selected} onChange={e => setSelected(e.target.value)}>
                            <option value="INCOME">Thu nhập</option>
                            <option value="SPENDING">Chi tiêu</option>
                        </select>
                    </div>
                    <p style={{ marginLeft: "19%" }}>Thêm chi tiêu với quy tắc <Link to="/add-spending-6-jar" style={{ color: "#ff0066", fontWeight: "bold" }}>6 chiếc hũ</Link></p>
                    {status === "loading" ? <Spinner className="spinner" animation="border" variant="danger" /> : <button type="submit">Thêm</button>}

                </form>
            </div>

        </>
    )
}

export default IncomeSpending