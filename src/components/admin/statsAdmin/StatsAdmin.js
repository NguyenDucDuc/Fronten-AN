import "./StatsAdmin.scss"
import "../cardStatsAdmin/CardStatsAdmin"
import CardStatsAdmin from "../cardStatsAdmin/CardStatsAdmin"


const StatsAdmin = () => {
    return (
        <>
            <div className="stats-admin">
                <CardStatsAdmin />
                <CardStatsAdmin />
                <CardStatsAdmin />
            </div>
        </>
    )
}

export default StatsAdmin