import "./GroupManager.scss"
import {useEffect, useState} from "react"
import CardGroup from "./cardGroup/CardGroup"
import {useDispatch, useSelector} from "react-redux"
import { getAllGroupAsyncThunk, updateAfterDeletedGroup, updateListGroups } from "../store/GroupSlice"
import cookies from "react-cookies"
import { useNavigate } from "react-router-dom"
import { socket } from "../../App"

const GroupManager = () => {
    const [groups, setGroups] = useState([])
    const dispatch = useDispatch()
    const listGroups = useSelector(state => state.group.listGroups)
    const nav = useNavigate()
    useEffect( () => {
        const checkLogin = () => {
            const accessToken = cookies.load("accessToken")
            if(!accessToken){
                nav("/login")
            }
        }
        const loadGroup = async () => {
            dispatch(getAllGroupAsyncThunk())
        }
        checkLogin()
        loadGroup()
    },[])

    useEffect( () => {
        socket.off("serverReSendGroupAfterDeleted").on("serverReSendGroupAfterDeleted", (data) => {
            dispatch(updateAfterDeletedGroup(data))
            console.log(data)
        })
        socket.off("serverReSendCreateGroup").on("serverReSendCreateGroup", data => {
            dispatch(updateListGroups(data))
        })
    }, [socket])
    return (
        <>
            <h1 className="" style={{textAlign: "center", fontWeight:"bold", color:"#ff0066", marginTop:"70px"}}>QUẢN LÝ NHÓM</h1>
            { listGroups !== null ? listGroups.map(g => <CardGroup groupId={g.id} groupname={g.groupname} createdAt={g.createdAt.split("T")[0]} purpose={g.purpose} />) : null}
            
        </>
    )
}

export default GroupManager