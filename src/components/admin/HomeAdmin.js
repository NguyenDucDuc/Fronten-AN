import "./HomeAdmin.scss"
import { useEffect, useState } from "react"
import { BrowserRouter, Link, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import CardStatsAdmin from "./cardStatsAdmin/CardStatsAdmin"
import StatsAdmin from "./statsAdmin/StatsAdmin"
import UserAdmin from "./userAdmin/UserAdmin"
import cookies from "react-cookies"
import jwt_decode from "jwt-decode"
import { authAPI, authAPIAdmin, endpoints } from "../configs/API"
import { useDispatch, useSelector } from "react-redux"
import { updateUsername } from "../store/UserSlice"
import { logoutUserAdmin, updateUserAdmin } from "../store/UserAdminSlice"



const HomeAdmin = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(true)
    const [showContent, setShowContent] = useState(false)
    const user = useSelector(state => state.userAdmin.user) // do backend tra ve gom ca access token {'accessToken': '', 'user': ''}
    const status = useSelector(state => state.userAdmin.status)

    // useEffect( () => {
    //     const loadAccessToken = async () => {
    //         const accessToken = cookies.load("accessToken")
    //         if(!accessToken) {
    //             nav("/admin/login")
    //         } 
    //         if(accessToken) {
    //             const decode = jwt_decode(accessToken)
    //             console.log(decode)
    //             const resUser = await authAPI().get(endpoints["getOneUser"](decode.id))
    //             if(resUser.role !== "ADMIN"){
    //                 nav("/admin/login")
    //             }
    //         }
    //     }

    //     loadAccessToken()
    // }, [])
    useEffect(() => {
        const checkLogin = async () => {
            if (!cookies.load("accessTokenAdmin")) {
                nav("/login-admin")
            } else {
                const resCurrentUser = await authAPIAdmin().get(endpoints["currentUser"])
                console.log(resCurrentUser.data)
                dispatch(updateUserAdmin(resCurrentUser.data))
            }
            console.log(user)
        }
        checkLogin()
    }, [])
    
    const handleMenuBar = (event) => {
        event.preventDefault()
        setShowMenu(!showMenu)
        setShowContent(!showContent)
    }
    window.addEventListener("resize", () => {
        if(window.innerWidth >= 1024){
            setShowMenu(true)
        }
        if(window.innerWidth <= 767){
            setShowMenu(false)
        }
    })

    const logoutHandle = (event) => {
        event.preventDefault();
        cookies.remove("accessTokenAdmin")
        dispatch(logoutUserAdmin())
        nav('/login-admin')
    }


    return (
        <>
            {/* {status === "loading" ?
                <div className="login-ring">
                    <div className="ring"></div>
                </div>
                :
                <div className="home-admin">
                    <i className="fa-solid fa-bars menu-bar" onClick={handleMenuBar}></i>
                    {
                        showMenu === true ?
                            <div className="left">
                                <h3>BUDGET APP</h3>
                                <ul className="side-bar">
                                    <li><Link to="/admin/users"><i class="fa fa-home" style={{ marginRight: "20px" }}></i>Thống kê</Link></li>
                                    <li><Link to="/admin"><i class="fa fa-signal" style={{ marginRight: "20px" }}></i>Thống kê</Link></li>
                                    <li><Link to="/admin"><i class="fa-brands fa-discord" style={{ marginRight: "20px" }}></i>Thống kê</Link></li>
                                    <li><Link to="/admin"><i class="fa fa-signal" style={{ marginRight: "20px" }}></i>Thống kê</Link></li>
                                    <li><Link to="/admin"><i class="fa-brands fa-discord" style={{ marginRight: "20px" }}></i>Thống kê</Link></li>
                                </ul>

                            </div>
                            : null
                    }

                    <div className="right">
                        <div className="right-header">
                            <div className="search">

                            </div>
                            <div className="info">
                                <img src="https://res.cloudinary.com/djbju13al/image/upload/v1665325365/Avatar/1665325365045.jpg" />
                                <p>{username}</p>
                            </div>
                        </div>
                        <div className="right-content">
                            <Outlet />
                        </div>

                    </div>
                </div>
            } */}
            <div className="home-admin">
                <div className="header-admin">
                    <div className="header-left">
                        <i className="fa-solid fa-bars menu-bar" onClick={handleMenuBar}></i>
                        {
                            showMenu === true
                                ?
                                <div className="side-bar">
                                    <h3>BUDGET APP</h3>
                                    <ul className="side-bar">
                                        <li><Link to="/admin/stats"><i class="fa fa-home" style={{ marginRight: "20px" }}></i>Thống kê</Link></li>
                                        <li><Link to="/admin/users"><i class="fa-solid fa-user-xmark" style={{ marginRight: "20px" }}></i>Quản lý user</Link></li>
                                        <li><Link to="/admin"><i class="fa-solid fa-gear" style={{ marginRight: "20px" }}></i>Cài đặt</Link></li>
                                        
                                    </ul>
                                </div>
                                :
                                null
                        } 

                    </div>
                    
                    <div className="header-right">
                        <img src={user.avatar === null ? "https://res.cloudinary.com/djbju13al/image/upload/v1665631876/Avatar/1665631874144.png" : user.avatar} />
                        <p>{user.fullname}</p>
                        <i class="fa-solid fa-right-from-bracket" onClick={logoutHandle}></i>
                    </div>
                </div>
                
                <div className="content">
                    <Outlet />
                </div>
            </div>


        </>
    )
}

export default HomeAdmin