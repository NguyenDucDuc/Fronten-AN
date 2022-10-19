import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { socket } from "../../../App"
import { addTempSpendingAsyncThunk, getAllTempSpendingAsyncThunk, updateListTempSpendings } from "../../store/TempSpendingGroupSlice"
import "./AcceptSpending.scss"
import CardAccept from "./cardAccept/CardAccept"


const AcceptSpending = () => {
    const dispatch = useDispatch()
    const {groupId} = useParams()
    const listTempSpendings = useSelector(state => state.tempSpending.listTempSpendings)
    
    
    useEffect( () => {
        dispatch(getAllTempSpendingAsyncThunk(groupId))
    }, [])
    useEffect( () => {
        // socket.once("serverReSendSpending", data => {
        //     console.log(data)
        //     // const reqBody = {
        //     //     userId: data.user_id.id,
        //     //     groupId: data.group_id,
        //     //     money: data.money,
        //     //     purpose: data.purpose
        //     // }
        //     // dispatch(addTempSpendingAsyncThunk(reqBody))
        //     dispatch(updateListTempSpendings(data))
        // })

        socket.off("serverReSendSpending").on("serverReSendSpending", data => {
            console.log(data)
            dispatch(updateListTempSpendings(data))
        })
    }, [socket])

    return (
        <>
            <h1 className="title-accept-spending">XÁC NHẬN CHI TIÊU THÀNH VIÊN</h1>
            {listTempSpendings.map((t,idx) => <CardAccept key={idx} userId={t.user_id.id} groupId={groupId} tempSpendingId={t.id} fullname={t.user_id.fullname} createdAt={t.createdAt.split("T")[0]} purpose={t.purpose} money={t.money} />)}
        </>
    )
}

export default AcceptSpending