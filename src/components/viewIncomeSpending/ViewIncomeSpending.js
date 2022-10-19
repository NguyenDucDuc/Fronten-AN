import "./ViewIncomeSpending.scss"
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/API"
import CardIncomeSpending from "./cardIncomeSpending/CardIncomeSpending"
import { useDispatch, useSelector } from "react-redux"
import { getAllIncomeSpendingThunk, searchIncomeSpendingAsyncThunk, updateIncomeSpending, updateIncomeSpendingAfterDeleted } from "../store/IncomeSpendingSlice"
import { Pagination } from "react-bootstrap"
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom"
import { socket } from "../../App"
import cookies from "react-cookies"

const ViewIncomeSpending = () => {
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [type, setType] = useState("INCOME")
    const [count, setCount] = useState()
    const fomatter = new Intl.NumberFormat('en')
    const dispatch = useDispatch()
    const listIncomeSpendings = useSelector(state => state.incomeSpending.listIncomeSpendings)
    const [query] = useSearchParams()
    const nav = useNavigate()
    const location = useLocation()
    const [resTotal, setResTotal] = useState()
    const [pageSize, setPageSize] = useState(5)
    // const [pageSize, setPageSize] = useState(5)
    useEffect(() => {
        // const loadIncomeSpendings = async () => {
        //     dispatch(getAllIncomeSpendingThunk())
        // }
        const loadIncomeSpendings = async () => {

            // let url = `${endpoints["getIncomeSpendingByUser"]}/?page=${page}&pageSize=${pageSize}`
            // const pageSize = query.get("pageSize")
            // if(query.get("pageSize")){
            //     setPageSize(query.get("pageSize"))
            // }
            if (pageSize === "all") {
                let url = `${endpoints["getIncomeSpendingByUser"]}/?`
                if (fromDate !== undefined) {
                    url += `&fromDate=${fromDate}`
                }
                if (toDate !== undefined) {
                    url += `&toDate=${toDate}`
                }
                if (type !== undefined) {
                    url += `&type=${type}`
                }
                dispatch(searchIncomeSpendingAsyncThunk(url))
            } else {
                let page = 1
                if (query.get("page")) {
                    // setPage(query.get("page"))
                    page = query.get("page")
                }
                // if(query.get("page") !== null){
                //     const page = query.get("page")
                //     url = `${endpoints["getIncomeSpendingByUser"]}/?page=${page}&pageSize=${pageSize}`
                // }
                let url = `${endpoints["getIncomeSpendingByUser"]}/?page=${page}&pageSize=${pageSize}`
                if (fromDate !== undefined) {
                    url += `&fromDate=${fromDate}`
                }
                if (toDate !== undefined) {
                    url += `&toDate=${toDate}`
                }
                if (type !== undefined) {
                    url += `&type=${type}`
                }
                console.log(url)
                dispatch(searchIncomeSpendingAsyncThunk(url))
            }

        }
        const loadCount = async () => {
            let url = `${endpoints["countIncomeSpending"]}/?`

            if (fromDate !== undefined) {
                url += `&fromDate=${fromDate}`
            }
            if (toDate !== undefined) {
                url += `&toDate=${toDate}`
            }
            if (type !== undefined) {
                url += `&type=${type}`
            }
            const res = await authAPI().get(url)
            console.log(res.data[0].Count)
            setCount(res.data[0].Count)
        }
        loadCount()
        loadIncomeSpendings()
        // loadIncomeSpendings()


    }, [query, fromDate, toDate, type, pageSize])

    useEffect(() => {
        const loadTotal = async () => {
            const res = await authAPI().get(endpoints["totalIncomeSpending"])
            setResTotal(res.data)
            console.log(res.data)
        }
        const checkLogin = () => {
            if(!cookies.load("accessToken")){
                nav("/login")
            }
        }
        checkLogin()
        loadTotal()
    }, [])

    useEffect( () => {
        socket.off("serverReSendIncomeSpending").on("serverReSendIncomeSpending", data => {
            console.log(data)
            dispatch(updateIncomeSpending(data))
        })
        socket.off("serverReSendIncomeSpendingAfterDelete").on("serverReSendIncomeSpendingAfterDelete", data => {
            console.log(data)
            dispatch(updateIncomeSpendingAfterDeleted(data))
        })
    }, [socket])


    const search = async (event) => {
        event.preventDefault()
        console.log(fromDate)
    }
    let items = []
    for (let i = 1; i <= Math.ceil(count / pageSize); i++) {
        items.push(
            <Pagination.Item key={i}>
                {/* <Link to={`/view-income-spending/?page=${i}&pageSize=${pageSize}`}>{i}</Link> */}
                <Link to={`/view-income-spending/?page=${i}`}>{i}</Link>
            </Pagination.Item>,
        );
    }
    const handlePageSize = (event) => {
        event.preventDefault()

    }
    return (
        <>
            <h1 className="title-view-spending">CHI TIÊU CỦA TÔI</h1>

            {/* Phan trang */}


            <section className="view-income-spending">
                <div className="filter">

                    <form onSubmit={search}>
                        <div className="form-group">
                            <label>From date:</label>
                            <input type="date" onChange={e => setFromDate(e.target.value)} name="fromDate" />
                        </div>
                        <div className="form-group">
                            <label>To date:</label>
                            <input type="date" onChange={e => setToDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Chọn loại:</label>
                            <select onChange={e => setType(e.target.value)}>
                                <option value="INCOME">Thu nhập</option>
                                <option value="SPENDING">Chi tiêu</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Chọn số trang:</label>
                            <select value={pageSize} onChange={e => setPageSize(e.target.value)}>
                                <option value={2}>2</option>
                                <option value={5}>5</option>
                                <option value="all">All</option>
                            </select>
                        </div>


                    </form>

                </div>
                <div className="card-view">
                    <div className="total">
                        {/* <p>Tổng thu nhập: {resTotal.totalIncome} VND</p>
                        {resTotal.totalSpending === null ? <p>Tổng chi tiêu: 0 VND</p> : <p>Tổng chi tiêu: {resTotal.totalSpending} VND</p> } */}
                    </div>
                    <Pagination>
                        {items}
                    </Pagination>
                    {listIncomeSpendings.map(i => <CardIncomeSpending incomeSpendingId={i.id} purpose={i.purpose} money={i.money} type={type} createdAt={i.createdAt.split("T")[0]} />)}
                </div>

            </section>
        </>
    )
}

export default ViewIncomeSpending