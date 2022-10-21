import CardAdminUser from "../cardAdminUser/CardAdminUser"
import "./UserAdmin.scss"
import { useEffect, useState } from "react"
import { authAPI, authAPIAdmin, endpoints } from "../../configs/API"


const UserAdmin = () => {
    const [active, setActive] = useState(false)
    const [users, setUsers] = useState()
    
    useEffect(() => {
        const loadAllUser = async () => {
            const res = await authAPI().get(endpoints["getAllUser"])
            setUsers(res.data)
            console.log(res.data)
        }

        loadAllUser()
    },[active])

    const lockUser = async (userId) => {
        const res = await authAPIAdmin().post(endpoints["lockUser"](userId))
        console.log(res.data)
        setActive(!active)
    }
    return (
        <>
            <div className="admin-user">
                {/* <CardAdminUser /> */}
                <table className="table-admin-user">
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>User name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Active</th>

                        </tr>
                    </thead>
                    {users !== undefined ? users.map((u,idx) => <tr key={idx}>
                        <td>
                            <img src={u.avatar === null ? "https://res.cloudinary.com/djbju13al/image/upload/v1666327537/Avatar/1666327534950.png" : u.avatar} />
                            {u.fullname}
                        </td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>{u.active === 1 ? <i className="fa fa-lock-open" onClick={() => lockUser(u.id)}></i> : <i className="fa fa-lock" onClick={() => lockUser(u.id)}></i>}</td>
                    </tr>)
                        :
                        null
                    }
                </table>
                
            </div>
        </>
    )
}

export default UserAdmin