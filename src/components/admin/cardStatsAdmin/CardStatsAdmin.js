import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../../configs/API"
import "./CardStatsAdmin.scss"


const CardStatsAdmin = () => {
    const [stats, setStats] = useState()
    useEffect( () => {
        const loadStats = async () => {
            const res = await authAPI().get(endpoints["countAllUser"])
            setStats(res.data)
        }
        loadStats()
    },[])
    return (
        <>
            <div className="card-stats-admin">
                <div className="card-stats-admin-left">
                    <p>{stats !== undefined ? stats.countUser : 0}</p>
                    <p style={{fontSize: "18px", fontWeight: "normal"}}>Customer</p>
                </div>
                <div className="card-stats-admin-right">
                    <p><i class="fa fa-user-group"></i></p>
                </div>
            </div>
        </>
    )
}

export default CardStatsAdmin