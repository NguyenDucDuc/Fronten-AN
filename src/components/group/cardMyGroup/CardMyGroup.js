import { useNavigate, useParams } from "react-router-dom"
import "./CardMyGroup.scss"
import {socket} from '../../../App'


const CardMyGroup = (props) => {

    const nav = useNavigate()

    const goToAddIncome = (event) => {
        event.preventDefault()
        nav(`/my-groups/${props.groupId}/add-income`)
    }
    const goToChatGroup = (event) => {
        event.preventDefault()
        // join user vao room chat
        socket.emit('joinRoom', parseInt(props.groupId))
        nav(`/group-manager/${props.groupId}/chat-group`)
    }
    const goToSpendingDetail = (event) => {
        event.preventDefault()
        nav(`/group-manager/${props.groupId}/spending-detail`)
    }
    return (
        <>
            <div className="card-my-group">
                <div className="card-my-group-left">
                    <div className="line"></div>
                    <div className="content">
                        <p>{props.groupname}</p>
                        <p>{props.createdAt}</p>
                    </div>

                </div>
                <div className="card-my-group-right">
                    <p>{props.purpose}</p>
                    <i class="fa-regular fa-circle-xmark"></i>
                    <i class="fa fa-dollar" onClick={goToAddIncome}></i>
                    <i class="fa fa-message" onClick={goToChatGroup}></i>
                    <i class="fa fa-calculator" onClick={goToSpendingDetail}></i>
                </div>
            </div>
        </>
    )
}

export default CardMyGroup