import "./StatsAdmin.scss"
import "../cardStatsAdmin/CardStatsAdmin"
import CardStatsAdmin from "../cardStatsAdmin/CardStatsAdmin"
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../../configs/API"


const StatsAdmin = () => {
    const [stats, setStats] = useState({
        countUser: 0,
        countGroup: 0
    })
    useEffect( () => {
        const loadStats = async () => {
            const res = await authAPI().get(endpoints['countUserAndGroup'])
            setStats(res.data)
        }
        loadStats()
    }, [])
    return (
        <>
            <div className="stats-admin">
                <CardStatsAdmin count={stats.countUser} name='Customers' />
                <CardStatsAdmin count={stats.countGroup} name='Groups' />
                <CardStatsAdmin />
            </div>
        </>
    )
}

export default StatsAdmin