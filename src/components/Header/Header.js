import { useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import "./Header.scss"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { logoutReducer, updateUsername } from "../store/UserSlice"
import cookies from "react-cookies"
import { authAPI, endpoints } from "../configs/API"
import { getAllWarningAsyncThunk, refreshCountWarning, refreshListWarning } from "../store/WarningSlice"
import Chat from "../Chat"
import { socket } from '../../App'

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
    const [showNotification, setShowNotification] = useState(false)
    const count = useSelector(state => state.warning.count)

    useEffect(() => {
        const updateUsernameReload = async () => {
            const accessToken = cookies.load('accessToken')
            console.log(accessToken)
            if (accessToken) {
                const resCurrentUser = await authAPI().get(endpoints["currentUser"])
                console.log(resCurrentUser.data)
                dispatch(updateUsername(resCurrentUser.data))
                // join vao room
                dispatch(getAllWarningAsyncThunk())
                socket.emit('login', resCurrentUser.data.id)
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
        if (window.innerWidth <= 1024)
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
                    <h1 style={{ fontWeight: "bold" }}><Link to="/" style={{ textDecoration: "none", color: "black" }}>BUDGET MANAGERMENT</Link></h1>
                </div>

                <div id="menu-bar" className="menu-bar" onClick={showMenu}><i id="i-menu-bar" class="fa-solid fa-bars"></i></div>

                {/* Kiem tran neu visible la show thi hien thi */}
                {/* Kiem tra hien thi tren mobile tablet */}
                {visible === "show" ?
                    <div className="header-right" id="header-right">
                        <ul id="menu" className="menu">
                            <li><Link to="/">Ch???c n??ng</Link>
                                <ul className="sub-menu">
                                    <li><Link to="/add-income-spending">Th??m chi ti??u</Link></li>
                                    <li><Link to="/view-income-spending">Chi ti??u c???a t??i</Link></li>
                                    <li><Link to="/create-group">T???o nh??m</Link></li>
                                    <li><Link to="/group-manager">Qu???n l?? nh??m</Link></li>
                                    <li><Link to="/my-groups">Nh??m c???a t??i</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/">Ti???n ??ch</Link>
                                <ul className="sub-menu">
                                    <li><Link to="/stats">Th???ng k??</Link></li>
                                    <li><Link to="/view-spending-jar">Xem h??</Link></li>
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
                            <li><Link to="/donate">???ng h??? t??c gi???</Link>
                                <ul className="sub-menu">
                                    <li><Link to="/">Menu</Link></li>
                                    <li><Link to="/">Menu</Link></li>
                                    <li><Link to="/">Menu</Link></li>
                                    <li><Link to="/">Menu</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">C???nh b??o <i className="fa-solid fa-bell" onClick={e => setShowNotification(!showNotification)}>{count !== null ? <span>{count}</span> : null}</i></Link>
                                {showNotification === true ?
                                    <div className="notification">
                                        {warnings !== null ? warnings.map(w => <a>{w.content}</a>)
                                            : null
                                        }
                                        <Link to='/warning' style={{textAlign: 'center', color: '#ff0066', fontWeight: 'bold'}} onClick={() => setShowNotification(!showNotification)}>Xem chi ti???t</Link>
                                    </div>
                                    : null
                                }
                            </li>
                            {user.fullname === null ? <li><Link to="/login">????ng nh???p <i class="fa-solid fa-user-large"></i></Link></li> : <li onClick={logout}><Link to="/">{user.fullname} <i class="fa-solid fa-right-from-bracket"></i></Link></li>}
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