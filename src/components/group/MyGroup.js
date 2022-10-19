import CardMyGroup from "./cardMyGroup/CardMyGroup"
import "./MyGroup.scss"
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import { socket } from "../../App"
import { useDispatch } from "react-redux"
import { updateListGroups } from "../store/GroupSlice"
import cookies from "react-cookies"
import { useNavigate } from "react-router-dom"

const MyGroup = () => {
    const [myGroups, setMyGroups] = useState([])
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect( () => {
        const checkLogin = () => {
            if(!cookies.load("accessToken")){
                nav("/login")
            }
        }
        const loadMyGroups = async () => {
            const res = await authAPI().get(endpoints["getBelongToByUser"])
            console.log(res.data)
            setMyGroups(res.data)
        }

        checkLogin()
        loadMyGroups()
    }, [])

    useEffect( () => {
        socket.off("serverReSendGroup").on("serverReSendGroup", data => {
            setMyGroups(data)
        })

        socket.off("clientReSendGroupDeleted").on("clientReSendGroupDeleted", data => {
            setMyGroups(data)
        })
    },[socket])
    return (
        <>
            <h1 style={{textAlign: "center", fontWeight:"bold", color:"#ff0066", marginTop:"70px"}}>NHÓM CỦA TÔI</h1>
            {
                myGroups.map((g,idx) => <CardMyGroup groupId={g.group_id.id} key={idx} groupname={g.group_id.groupname} createdAt={g.group_id.createdAt.split("T")[0]} purpose={g.group_id.purpose} />)
            }
        </>
    )
}

export default MyGroup