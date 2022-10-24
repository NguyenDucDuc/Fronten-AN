import CardMyGroup from "./cardMyGroup/CardMyGroup"
import "./MyGroup.scss"
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import { socket } from "../../App"
import { useDispatch } from "react-redux"
import { updateListGroups } from "../store/GroupSlice"
import cookies from "react-cookies"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Pagination } from "react-bootstrap"

const MyGroup = () => {
    const [myGroups, setMyGroups] = useState([])
    const [countGroup, setCountGroup] = useState()
    const [query] = useSearchParams()
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(() => {
        const checkLogin = () => {
            if (!cookies.load("accessToken")) {
                nav("/login")
            }
        }
        

        const loadCountGroup = async () => {
            const res = await authAPI().get(endpoints['countGroup'])
           
            setCountGroup(res.data.count)
        }

        
        checkLogin()
        
        loadCountGroup()
    }, [])

    useEffect( () => {
        const loadMyGroups = async () => {
            let url = `${endpoints["getBelongToByUser"]}`
            let page=1
            if(query.get('page')){
                page=parseInt(query.get('page'))
                url += `/?page=${page}`
            }

            //finally
            // const res = await authAPI().get(endpoints["getBelongToByUser"])
            const res = await authAPI().get(url)
            console.log(res.data)
            setMyGroups(res.data)
        }
        loadMyGroups()
    }, [query])

    useEffect(() => {
        socket.off("serverReSendGroup").on("serverReSendGroup", data => {
            setMyGroups(data)
        })

        socket.off("clientReSendGroupDeleted").on("clientReSendGroupDeleted", data => {
            setMyGroups(data)
        })
    }, [socket])

    let items = [];
    for (let i = 1; i <= Math.ceil(countGroup/5); i++) {
        console.log(Math.ceil(countGroup/5))
        items.push(
            <Pagination.Item key={i}>
                <Link to={`/my-groups/?page=${i}`}>{i}</Link>
            </Pagination.Item>,
        );
    }
    return (
        <>
            <h1 style={{ textAlign: "center", fontWeight: "bold", color: "#ff0066", marginTop: "70px" }}>NHÓM CỦA TÔI</h1>
            <Pagination>
                {items}
            </Pagination>
            {
                myGroups.map((g, idx) => <CardMyGroup groupId={g.group_id.id} key={idx} groupname={g.group_id.groupname} createdAt={g.group_id.createdAt.split("T")[0]} purpose={g.group_id.purpose} />)
            }
        </>
    )
}

export default MyGroup