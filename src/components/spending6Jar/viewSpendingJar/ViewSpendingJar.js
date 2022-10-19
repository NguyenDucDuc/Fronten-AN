import { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { socket } from "../../../App"
import { authAPI, endpoints } from "../../configs/API"
import { searchIncomeSpendingAsyncThunk } from "../../store/IncomeSpendingSlice"
import { getAllSpendingJar, searchJarAsyncThunk, updateSpendingJar } from "../../store/SpendingJarSlice"
import CardIncomeSpending from "../../viewIncomeSpending/cardIncomeSpending/CardIncomeSpending"
import CardSpendingJar from "../cardSpendingJar/CardSpendingJar"
import "./ViewSpendingJar.scss"
import cookies from "react-cookies"


const ViewSpendingJar = () => {
    const dispatch = useDispatch()
    const listSpendingJar = useSelector(state => state.spendingJar.listSpendingJar)
    const [jarType, setJarType] = useState()
    const [count, setCount] = useState()
    const [query] = useSearchParams()
    const nav = useNavigate()
    const [percentJar, setPercentJar] = useState()
    useEffect(() => {
        const loadAllSpendingJar = async () => {
            //khoi tao page va pagesize mac dinh
            let page = 1
            let pageSize = 5
            if (query.get("page")) {
                page = query.get("page")
            }
            if (query.get("pageSize")) {
                pageSize = query.get("pageSize")
            }
            // lay gia tri tu url cua trinh duyet gui len endpoint API
            let url = `${endpoints["getAllSpendingJar"]}/?page=${page}&pageSize=${pageSize}`
            if (jarType !== undefined) {
                url += `&jar=${jarType}`
            }
            console.log(url)
            dispatch(searchJarAsyncThunk(url))
        }

        const loadCountSpendingJar = async () => {
            let url = `${endpoints["countSpendingJar"]}`
            if (jarType !== undefined) {
                url += `/?jar=${jarType}`
            }
            const res = await authAPI().get(url)
            console.log(res.data)
            setCount(res.data.countSpendingJar)
        }
        loadAllSpendingJar()
        loadCountSpendingJar()
    }, [jarType, query])

    useEffect(() => {
        socket.off("serverReSendSpendingJar").on("serverReSendSpendingJar", data => {
            console.log(data)
            dispatch(updateSpendingJar(data))
            // load lai phan tram cua 6 hu
            const loadPercentJar = async () => {
                const resPercent = await authAPI().get(endpoints["calcPercentJar"])
                console.log(resPercent.data)
                setPercentJar(resPercent.data)
            }
    
            loadPercentJar()
            
        })
    }, [socket])

    useEffect(() => {
        const loadPercentJar = async () => {
            const resPercent = await authAPI().get(endpoints["calcPercentJar"])
            console.log(resPercent.data)
            setPercentJar(resPercent.data)
        }
        const checkLogin = () => {
            if(!cookies.load("accessToken")){
                nav("/login")
            }
        }
        checkLogin()

        loadPercentJar()
    }, [])

    const handleBtnGetAll = async (event) => {
        event.preventDefault()
        let url1 = `${endpoints["countSpendingJar"]}`
        setJarType(undefined)
        const res = await authAPI().get(url1)
        console.log(res.data)
        setCount(res.data.countSpendingJar)

        let url = `${endpoints["getAllSpendingJar"]}/?page=${1}&pageSize=${5}`
        dispatch(searchJarAsyncThunk(url))
    }

    let items = []
    for (let i = 1; i <= Math.ceil(count / 5); i++) {
        items.push(
            <Pagination.Item key={i}>
                {/* Hien thi url len trinh duyet */}
                <Link to={`/view-spending-jar/?page=${i}&pageSize=${5}`}>{i}</Link>
            </Pagination.Item>,
        );
    }



    return (
        <>
            <h1 className="title-view-spending">CHI TIÊU 6 CHIẾC HŨ</h1>
            <div className="view-spending-jar">
                <div className="group-button">
                    <button onClick={handleBtnGetAll}>ALL</button>
                    <button onClick={e => setJarType("NEC")}>NEC</button>
                    <button onClick={e => setJarType("LTS")}>LTS</button>
                    <button onClick={e => setJarType("EDU")}>EDU</button>
                    <button onClick={e => setJarType("PLAY")}>PLAY</button>
                    <button onClick={e => setJarType("FFA")}>FFA</button>
                    <button onClick={e => setJarType("GIVE")}>GIVE</button>
                </div>
                <div className="table-jar">
                    <table className="table-jar">
                        <thead>
                            <tr>
                                <td>Tên hũ</td>
                                <td>Khuyến khích</td>
                                <td>Đã chi</td>
                            </tr>
                        </thead>
                        {percentJar !== undefined && percentJar.map((pj,idx) => <tr key={idx}>
                            <td>{pj.jar}</td>
                            <td>{pj.jar === "NEC" ? 55 : pj.jar === "GIVE" ? 5 : 10}%</td>
                            <td>{parseFloat(pj.total).toFixed(2)}%</td>
                        </tr>)}
                    </table>
                </div>
                <Pagination>
                    {items}
                </Pagination>
                <div className="list-card-spending">
                    {listSpendingJar.map(j => <CardSpendingJar spendingJarId={j.id} jarType={jarType} money={j.money} jar={j.jar} purpose={j.purpose} createdAt={j.createdAt.split("T")[0]} />)}
                </div>
            </div>


        </>
    )
}

export default ViewSpendingJar