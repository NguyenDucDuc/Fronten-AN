import "./CardMember.scss"
import {useDispatch} from "react-redux"
import { deleteUserFromGroupAsyncThunk } from "../../store/BelongToSlice"
import { socket } from "../../../App"
import { authAPI, endpoints } from "../../configs/API"
import {confirmAlert} from "react-confirm-alert"

const CardMember = (props) => {
    const dispatch = useDispatch()
    const deleteMember = async (event) => {
        event.preventDefault()
        // console.log(props.belongToId)
        // await dispatch(deleteUserFromGroupAsyncThunk(props.belongToId))
        // const resBelongTo = await authAPI().get(endpoints["getBelongToByUserId"](props.userId))
        // socket.emit("clientSendGroupDeleted", resBelongTo.data)
        confirmAlert({
            title: "Xóa thành viên",
            message: `Bạn có muốn xóa ${props.fullname} khỏi nhóm?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        await dispatch(deleteUserFromGroupAsyncThunk(props.belongToId))
                        const resBelongTo = await authAPI().get(endpoints["getBelongToByUserId"](props.userId))
                        socket.emit("clientSendGroupDeleted", resBelongTo.data)
                    }
                },
                {
                    label: "No",
                    onClick: () => {

                    }
                }
            ]
        })
    }
    return (
        <>
            <div className="card-member">
                <p>{props.fullname}</p>
                <p className="username">{props.username}</p>
                <div className="img-rouded">
                    <img src={props.avatar} />
                </div>

                <i class="fa fa-xmark" onClick={deleteMember}></i>


            </div>
        </>
    )
}

export default CardMember