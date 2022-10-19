import "./SpendingGroupDetail.scss"
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import { useParams } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"

const SpendingGroupDetail = () => {
    const { groupId } = useParams()
    const [flow, setFlow] = useState([])
    const [detail, setDetail] = useState({ total: 0, count: 0, userMustPay: 0 })
    const [userInfo, setUserInfo] = useState(null)
    const numberFormat = new Intl.NumberFormat('en-US')
    useEffect(() => {
        const loadDetail = async () => {
            const res = await authAPI().get(endpoints["spendingGroupDetail"](groupId))
            console.log(res.data)
            setFlow(res.data.flow)
            setDetail(res.data)
            setUserInfo(res.data)
        }


        loadDetail()
    }, [])

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Bat buoc nhat"),
            password: Yup.string().required("Bat buoc nhap")
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    })
    // console.log(formik.values)
    return (
        <>
            <h1 className="title-my-groups">SPENDING GROUP DETAIL</h1>
            <div className="spending-detail-info">
                <p>Tổng tiền: {<span>{numberFormat.format(detail.total)}</span>}  VND</p>
                <p>Số thành viên: {<span>{detail.count}</span>} </p>
                <p>Một người cần trả: {<span>{numberFormat.format(detail.userMustPay)}</span>}  VND</p>
            </div>
           
            <div className="spending-detail-table">
                <table>
                    <tr>
                        <th>Tên thành viên</th>
                        <th>Số tiền đã chi</th>
                    </tr>
                    {userInfo !== null && userInfo.users.map(u => <tr>
                        <td>{u.user.username}</td>
                        <td>{ numberFormat.format(u.totalSpending)} VND</td>
                    </tr>)}
                    {/* {detail.users.map(u => <tr>
                        <td>{u.user.username !== null && u.user.username}</td>
                        <td>{u.totalSpending !== null && u.totalSpending}</td>
                    </tr>)} */}

                </table>
            </div>
            <div className="spending-detail-table">
                <table>
                    <tr>
                        <th>Người trả</th>
                        <th>Người nhận</th>
                        <th>Số tiền</th>
                    </tr>
                    {flow.map((m, idx) =>
                        <tr key={idx}>
                            <td>{m.from.username}</td>
                            <td>{m.to.username}</td>
                            <td>{numberFormat.format(m.money)} VND</td>
                        </tr>
                    )}

                </table>
            </div>

        </>
    )
}

export default SpendingGroupDetail