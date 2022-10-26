import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../../configs/API"
import "./CardStatsAdmin.scss"


const CardStatsAdmin = (props) => {
    // const [stats, setStats] = useState()
    // useEffect( () => {
    //     const loadStats = async () => {
    //         const res = await authAPI().get(endpoints["countUserAndGroup"])
    //         setStats(res.data)
    //     }
    //     loadStats()
    // },[])
    return (
        <>
            <div className="card-stats-admin">
                <div className="card-stats-admin-left">
                    <p>{props.count}</p>
                    <p style={{fontSize: "18px", fontWeight: "normal"}}>{props.name}</p>
                </div>
                <div className="card-stats-admin-right">
                    <p><i class="fa fa-user-group"></i></p>
                </div>
            </div>
        </>
    )
}

export default CardStatsAdmin