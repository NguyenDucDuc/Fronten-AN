import "./GroupManager.scss"
import { useEffect, useState } from "react"
import CardGroup from "./cardGroup/CardGroup"
import { useDispatch, useSelector } from "react-redux"
import { getAllGroupAsyncThunk, updateAfterDeletedGroup, updateListGroups } from "../store/GroupSlice"
import cookies from "react-cookies"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { socket } from "../../App"
import { Pagination } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/API"

const GroupManager = () => {
    const [groups, setGroups] = useState([])
    const [countGroup, setCountGroup] = useState()
    const dispatch = useDispatch()
    const [query] = useSearchParams()
    const listGroups = useSelector(state => state.group.listGroups)
    const nav = useNavigate()
    useEffect(() => {
        const checkLogin = () => {
            const accessToken = cookies.load("accessToken")
            if (!accessToken) {
                nav("/login")
            }
        }


        const loadCountGroup = async () => {
            const res = await authAPI().get(endpoints["countGroup"])
            setCountGroup(res.data.count)
        }

        checkLogin()

        loadCountGroup()
    }, [])

    useEffect(() => {
        const loadGroup = async () => {
            let url = `${endpoints["getGroupByUser"]}`
            let page = 1
            if (query.get('page')) {
                page = parseInt(query.get('page'))
                url += `/?page=${page}`
            }
            dispatch(getAllGroupAsyncThunk(url))
        }
        loadGroup()
    }, [query])

    useEffect(() => {
        socket.off("serverReSendGroupAfterDeleted").on("serverReSendGroupAfterDeleted", (data) => {
            dispatch(updateAfterDeletedGroup(data))
            console.log(data)
        })
        socket.off("serverReSendCreateGroup").on("serverReSendCreateGroup", data => {
            dispatch(updateListGroups(data))
        })
    }, [socket])

    let items = [];
    for (let i = 1; i <= Math.ceil(countGroup / 5); i++) {
        items.push(
            <Pagination.Item key={i}>
                <Link to={`/group-manager/?page=${i}`}>{i}</Link>
            </Pagination.Item>,
        );
    }
    return (
        <>
            <h1 className="" style={{ textAlign: "center", fontWeight: "bold", color: "#ff0066", marginTop: "70px" }}>QUẢN LÝ NHÓM</h1>
            <Pagination>
                {items}
            </Pagination>
            {listGroups !== null ? listGroups.map(g => <CardGroup groupId={g.id} groupname={g.groupname} createdAt={g.createdAt.split("T")[0]} purpose={g.purpose} />) : null}

        </>
    )
}

export default GroupManager