import "./CardGroup.scss"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import { socket } from "../../../App"
import { confirmAlert } from "react-confirm-alert"
import { useDispatch } from "react-redux"
import { deleteGroupAsyncThunk } from "../../store/GroupSlice"
import { authAPI, endpoints } from "../../configs/API"



const CardGroup = (props) => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const goToMember = (event) => {
        event.preventDefault()
        nav(`/group-manager/${props.groupId}/member`)
        
    }
    const deleteGroup = (event) => {
        event.preventDefault()
        console.log(props.groupId)
        confirmAlert({
            title: "Xóa nhóm",
            message: "Bạn có chắc chắn muốn xóa nhóm?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const currentUser = await authAPI().get(endpoints['currentUser'])
                        const resDeleteGroup = await dispatch(deleteGroupAsyncThunk(props.groupId))
                        // socket.emit("clientSendGroupAfterDeleted", resDeleteGroup.payload)
                        socket.emit("clientSendGroupAfterDeleted", {groups: resDeleteGroup.payload, userId: currentUser.data.id})
                    },
                    style: {
                        backgroundColor: "#00cc66"
                    }
                },
                {
                    label: "No",
                    onClick: () => {

                    },
                    style: {
                        backgroundColor: "#ff0066"
                    }
                }
            ]
        })
    }
    const goToAcceptSpending = (event) => {
        event.preventDefault()
        nav(`/group-manager/${props.groupId}/accept-spending`)
    }
    const goToChatGroup = (event) => {
        event.preventDefault()
        // join room socket io
        socket.emit('joinRoom', parseInt(props.groupId))
        nav(`/group-manager/${props.groupId}/chat-group`)
        // join room socket
    }

    const goToSpendingDetail = (event) => {
        event.preventDefault()
        nav(`/group-manager/${props.groupId}/spending-detail`)
    }
    return (
        <>
                <div className="card-group">
                    <div className="card-group-left">
                        <div className="line"></div>
                        <div className="content">
                            <p>{props.groupname}</p>
                            <p>{props.createdAt}</p>
                        </div>

                    </div>
                    <div className="card-group-right">
                        <p>{props.purpose}</p>
                        <i class="fa-regular fa-circle-xmark" onClick={deleteGroup}></i>
                        <i class="fa fa-users" onClick={goToMember}></i>
                        <i class="fa fa-check" onClick={goToAcceptSpending}></i>
                        <i class="fa fa-message" onClick={goToChatGroup}></i>
                        <i class="fa fa-calculator" onClick={goToSpendingDetail}></i>
                    </div>
                </div>
        </>
    )
}

export default CardGroup