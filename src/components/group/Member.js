import "./Member.scss"
import {useEffect, useRef, useState} from "react"
import CardMember from "./cardMember/CardMember"
import { authAPI, endpoints } from "../configs/API"
import {useParams, useSearchParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { addMemberToGroupAsyncThunk, getAllBelongToByGroupAsyncThunk } from "../store/BelongToSlice"
import {socket} from "../../App"

const Member = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState()
    const belongTos = useSelector(state => state.belongTo.listBelongTos)
    const status = useSelector(state => state.belongTo.status)
    const dispatch = useDispatch()
    const inputRef = useRef()
    const {groupId} = useParams()
    const changeShowSearch = (event) => {
        setShowSearch(!showSearch)
       
    }

    useEffect( () => {
        const loadUser = async () => {
            let url = `${endpoints["getAllUser"]}`
            if(username !== null ){
                url+=`/?username=${username}`
            }
            const res = await authAPI().get(url)
            
            setUsers(res.data)
        }
        loadUser()
        
    },[username])
    useEffect( () => {
        dispatch(getAllBelongToByGroupAsyncThunk(groupId))
    }, [])

    const setUsernameToInput = (event, username, id) => {
        event.preventDefault()
        inputRef.current.value = username
        setUserId(id)
        console.log(userId)
    }

    const addMember = async (event) => {
        event.preventDefault()
        const reqBody = {
            userId: userId,
            groupId: groupId
        }
        await dispatch(addMemberToGroupAsyncThunk(reqBody))
        const res = await authAPI().get(endpoints["getGroupDetail"](reqBody.groupId))
        // const groupEmit = {
        //     user_id: userId,
        //     group_id: res.data
        // }
        // lay danh sach group cua user se nhan de emit
        const resBelongTo = await authAPI().get(endpoints["getBelongToByUserId"](userId))
        socket.emit("clientSendGroup", resBelongTo.data)
    }
    return (
        <>
            <h1 className="title-member-manager">QUẢN LÝ THÀNH VIÊN</h1>
            {status === "loading" ? 
                <div className="member-loading">
                    <div className="ring">

                    </div>
                </div>
                :
                <div>
                    <div className="add-member">
                        <div className="search-left">
                            <input type="text" placeholder="nhập tên người dùng" onClick={changeShowSearch} onChange={e => setUsername(e.target.value)} ref={inputRef} />
                            {showSearch === true ?
                                <div className="username-search">
                                    {users.map((u,idx) => <p key={idx} onClick={(e) => setUsernameToInput(e,u.username, u.id)}>{u.username}</p>)}
                                </div>
                                :
                                null
                            }
                            
                        </div>
                        
                        <button onClick={addMember}>Thêm</button>
                    </div>
                    <div className="card-members">
                        {belongTos.map((b,idx) => <CardMember key={idx} belongToId={b.id} userId={userId} fullname={b.user_id.fullname ? b.user_id.fullname : "No name"} username={b.user_id.username} avatar={b.user_id.avatar} />)}
                        
                    </div>
                </div>
            }
            
            
            <h1>{groupId}</h1>
        </>
    )
}

export default Member