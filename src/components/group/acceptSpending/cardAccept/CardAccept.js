import { useDispatch } from "react-redux"
import { authAPI, endpoints } from "../../../configs/API"
import { deleteTempSpendingAsyncThunk } from "../../../store/TempSpendingGroupSlice"
import "./CardAccept.scss"

const CardAccept = (props) => {
    const dispatch = useDispatch()
    const numberFormat = new Intl.NumberFormat('en-US')
    const deleteTempSpending = (event) => {
        event.preventDefault()
        dispatch(deleteTempSpendingAsyncThunk(props.tempSpendingId))
    }
    const deleteTemAndAddSpending = async (event) => {
        event.preventDefault()
        await dispatch(deleteTempSpendingAsyncThunk(props.tempSpendingId))
        const res = await authAPI().post(endpoints["addSpendingGroup"], {
            user_id: parseInt(props.userId),
            group_id: parseInt(props.groupId),
            money: parseInt(props.money),
            purpose: props.purpose
        })
        console.log(res.data)
    }
    return (
        <>
            <div className="card-accept-spending">
                    <div className="card-accept-spending-left">
                        <div className="line"></div>
                        <div className="content">
                            <p>{props.fullname}</p>
                            <p>{props.createdAt}</p>
                        </div>

                    </div>
                    <div className="card-accept-spending-right">
                        <p>{props.purpose}</p>
                        <p>{numberFormat.format(props.money)} VND</p>
                        <i class="fa-regular fa-circle-xmark" onClick={deleteTempSpending} ></i>
                        <i class="fa fa-check" onClick={deleteTemAndAddSpending}></i>
                    </div>
                </div>
        </>
    )
}

export default CardAccept