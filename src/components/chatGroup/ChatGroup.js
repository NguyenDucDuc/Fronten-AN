import { useEffect, useRef, useState } from "react"
import "./ChatGroup.scss"
import { useDispatch, useSelector } from "react-redux"
import { authAPI, endpoints } from "../configs/API"
import { useParams } from "react-router-dom"
import { addMessage, addMessageGroupAsyncThunk, getAllMessageAsyncThunk } from "../store/MessageGroupSlice"
import { socket } from "../../App"
import CardMessage from "./CardMessage"

const ChatGroup = () => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const { groupId } = useParams()
    const listMessages = useSelector(state => state.message.listMessages)
    const status = useSelector(state => state.message.status)
    const [userTyping, setUserTyping] = useState(undefined)
    const [statusUserTyping, setStatusUserTyping] = useState(false)
    const refCardMessage = useRef()
    const refContent = useRef(null)
    const [crUser, setCrUser] = useState()
    const refInput = useRef()

    useEffect(() => {
        const loadMessage = async () => {
            dispatch(getAllMessageAsyncThunk(groupId))
        }
        loadMessage()

        // socket.emit("joinRoom", parseInt(groupId))
        console.log(listMessages)
        refContent.current.scrollIntoView({ behavior: "smooth" })
    }, [])

    useEffect(() => {
        socket.off("serverReSendMessage").on("serverReSendMessage", data => {
            console.log(data)
            dispatch(addMessage(data))
        })
        socket.off("serverReSendInfoClientTyping").on("serverReSendInfoClientTyping", data => {
            console.log(data)
            setUserTyping(data)
            setStatusUserTyping(true)

        })
        socket.off("serverReSendTypingOff").on("serverReSendTypingOff", userNull => {
            console.log(userNull)
            setUserTyping(userNull)
        })

    }, [socket])

    const sendMessage = async (event) => {
        event.preventDefault()
        if (message !== null && message !== "") {
            const resCurrentUser = await authAPI().get(endpoints["currentUser"])
            setCrUser(resCurrentUser.data)
            const resMessage = await authAPI().post(endpoints["addMessage"], {
                user_id: parseInt(resCurrentUser.data.id),
                group_id: parseInt(groupId),
                content: message
            })
            console.log(resMessage.data)
            socket.emit("clientSendMessage", resMessage.data)

            //SCROLL to end
            refContent.current.scrollIntoView({ behavior: 'smooth' })

        }
        // set input trong
        refInput.current.value = ""

        // console.log(resM)
    }

    const typing = async (event) => {
        event.preventDefault()
        const res = await authAPI().get(endpoints["currentUser"])
        socket.emit("infoClientTyping", res.data)
        setStatusUserTyping(true)
        console.log(statusUserTyping)
    }
    const typingOff = (event) => {
        event.preventDefault()
        const userNull = null
        socket.emit("clientSendTypingOff", userNull)
    }
    return (
        <>
            <h1 className="title-chat-group">Chat group</h1>

            {status === "loading" ?
                <div className="login-ring">
                    <div className="ring"></div>
                </div>
                :
                <div className="chat-group" onClick={typingOff}>

                    <div className="content" ref={refContent}>
                        {/* <CardMessage /> */}
                        {/* {listMessages.map((m, idx) => <p key={idx}>{m.userId.fullname}: {m.content}</p>)} */}
                        {listMessages.map((m, idx) => {

                            return <CardMessage ref={refCardMessage} data={m} />
                        })}
                        {userTyping !== null && userTyping !== undefined ? <p style={{ color: "#8c8c8c" }}>mọi người đang nhập...</p> : null}

                    </div>

                    <div className="controller">
                        <input ref={refInput} type="text" placeholder="enter message" onClick={typing} onChange={(e) => setMessage(e.target.value)} />
                        <button onClick={sendMessage}>Send</button>
                    </div>

                </div>
            }


        </>
    )
}

export default ChatGroup