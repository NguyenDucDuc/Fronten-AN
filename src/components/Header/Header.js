import { useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import "./Header.scss"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { logoutReducer, updateUsername } from "../store/UserSlice"
import cookies from "react-cookies"
import { authAPI, endpoints } from "../configs/API"
import { refreshCountWarning, refreshListWarning } from "../store/WarningSlice"
import Chat from "../Chat"

const Header = () => {

    const user = useSelector(state => state.user.user)
    const status = useSelector(state => state.user.status)
    const nav = useNavigate()
    //STATE
    const warnings = useSelector(state => state.warning.listWarning)
    const dispatch = useDispatch()
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [background, setBackground] = useState("#e6e6e6")
    const [visible, setVisible] = useState("show")
    const count = useSelector(state => state.warning.count)

    useEffect( () => {
        const updateUsernameReload = async () => {
            const accessToken = cookies.load('accessToken')
            console.log(accessToken)
            if(accessToken){
                const resCurrentUser = await authAPI().get(endpoints["currentUser"])
                console.log(resCurrentUser.data)
                dispatch(updateUsername(resCurrentUser.data))
            }
        }
        updateUsernameReload()
        console.log(user)
    }, [])

    const showMenu = (event) => {
        event.preventDefault()
        // if (window.innerWidth <= 1024) {
        //     let menu = document.getElementById("header-right")
        //     let menuBar = document.getElementById("menu-bar")
        //     if (menu.style.display === "none") {
        //         menu.style.display = "block"
        //         menuBar.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        //     }
        //     else {
        //         menu.style.display = "none"
        //         menuBar.innerHTML = '<i id="i-menu-bar" class="fa-solid fa-bars"></i>'
        //     }
        //     if (visible === "hidden")
        //         setVisible("show")
        //     else
        //         setVisible("hidden")
        // }
        if (visible === "hidden")
            setVisible("show")
        else
            setVisible("hidden")


    }
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            setVisible("show")
        }
        if(window.innerWidth <= 1024)
            setVisible("hidden")
    })

    const logout = async (event) => {
        event.preventDefault()
        await dispatch(logoutReducer())
        // await dispatch(refreshListWarning())
        dispatch(refreshCountWarning())
        nav("/login")
        cookies.remove("accessToken")
    }

    const backgroundWhite = (event) => {
        event.preventDefault()
        setBackground("white")

    }

    // if(window.location.pathname === "/admin")
    //     return null
    // else {
        return (
            <>
                <div className="header">
                    <div className="header-left">
                        <h1 style={{fontWeight: "bold"}}><Link to="/" style={{textDecoration: "none", color: "black"}}>BUDGET MANAGERMENT</Link></h1>
                    </div>
    
                    <div id="menu-bar" className="menu-bar" onClick={showMenu}><i id="i-menu-bar" class="fa-solid fa-bars"></i></div>
    
                    {/* Kiem tran neu visible la show thi hien thi */}
                    {/* Kiem tra hien thi tren mobile tablet */}
                    {visible === "show" ?
                        <div className="header-right" id="header-right">
                            <ul id="menu" className="menu">
                                <li><Link to="/">Chức năng</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/add-income-spending">Thêm chi tiêu</Link></li>
                                        <li><Link to="/view-income-spending">Chi tiêu của tôi</Link></li>
                                        <li><Link to="/create-group">Tạo nhóm</Link></li>
                                        <li><Link to="/group-manager">Quản lý nhóm</Link></li>
                                        <li><Link to="/my-groups">Nhóm của tôi</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/">Tiện ích</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/stats">Thống kê</Link></li>
                                        <li><Link to="/view-spending-jar">Xem hũ</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/">Menu</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/">Menu</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/donate">Ủng hộ tác giả</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="/">Menu</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                        <li><Link to="/">Menu</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/warning">Cảnh báo <i className="fa-solid fa-bell">{count !== null ?<span>{count}</span> : null }</i></Link>
                                    <div className="notification">
                                        {/* <a href="#">Thu nhập của bạn vừa tăng 120.000VND</a>
                                    <a href="#">Thu nhập của bạn vừa tăng 120.000VND</a> */}
                                    </div>
                                </li>
                                {user.fullname === null ? <li><Link to="/login">Đăng nhập <i class="fa-solid fa-user-large"></i></Link></li> : <li onClick={logout}><Link to="/">{user.fullname} <i class="fa-solid fa-right-from-bracket"></i></Link></li>}
                                {status === "loading" ? <Spinner animation="border" variant="danger" /> : null}
                            </ul>
                        </div>
                        :
                        null
                    }
    
    
                </div>
                <Outlet />
                <Chat />
            </>
        )
    }

    

export default Header