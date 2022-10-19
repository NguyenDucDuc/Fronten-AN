import "./CardIncomeSpending.scss"
import {useDispatch} from "react-redux"
import { deleteIncomeSpendingAsyncThunk } from "../../store/IncomeSpendingSlice"
import { confirmAlert } from 'react-confirm-alert'; // Import
import {socket} from "../../../App"


const CardIncomeSpending = (props) => {
    const dispatch = useDispatch()
    const deleteIncomeSpending = async (event) => {
        event.preventDefault()
        // const info = {
        //     incomeSpendingId: props.incomeSpendingId,
        //     type: props.type
        // }
        // dispatch(deleteIncomeSpendingAsyncThunk(info))
        confirmAlert({
            title: "Xóa chi tiêu?",
            message: "Bạn chắc chắn muốn xóa?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const info = {
                            incomeSpendingId: props.incomeSpendingId,
                            type: props.type
                        }
                        const resDelete = await dispatch(deleteIncomeSpendingAsyncThunk(info))
                        socket.emit("clientSendIncomeSpendingAfterDelete", resDelete.payload)
                    },
                    style: {
                        backgroundColor: "#00cc66"
                    }
                },
                {
                    label: "No",
                    onClick: () => {
                        console.log("No deleted")
                    },
                    style: {
                        backgroundColor: "#ff0066"
                    }
                }
            ]
        })
    }
    const numberFormat = new Intl.NumberFormat('en-US')
    return(
        <>
            <div className="card-income-spending">
                <div className="left">
                    <div className="line"></div>
                    <div className="content">
                        <p>{props.purpose}</p>
                        <p>{props.createdAt}</p>
                    </div>
                    
                </div>
                <div className="right">
                    <p style={{fontSize: '22px'}}>{props.jar}</p>
                    <p>{props.type === "INCOME" ? "+" : "-"} {numberFormat.format(props.money)} VND</p>
                    <i class="fa-regular fa-circle-xmark" onClick={deleteIncomeSpending}></i>
                </div>
            </div>
        </>
    )
}

export default CardIncomeSpending