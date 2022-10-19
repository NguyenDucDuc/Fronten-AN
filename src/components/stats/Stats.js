import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import "./Stats.scss"
import { authAPI, endpoints } from '../configs/API';
import cookies from "react-cookies"
import { useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);





const Stats = () => {
    const [total, setTotal] = useState({ totalIncome: 0, totalSpending: 0 })
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const format = new Intl.NumberFormat('en-US')
    const nav = useNavigate()
    useEffect(() => {
        const loadTotal = async () => {
            let url = `${endpoints['statsTotalIncomeSpending']}`
            if (fromDate !== undefined) {
                url += `/?fromDate=${fromDate}`
            }
            if (toDate !== undefined) {
                url += `/?toDate=${toDate}`
            }
            const res = await authAPI().get(url)
            console.log(res.data)
            setTotal(res.data)
        }

        loadTotal()
    }, [fromDate, toDate])
    const data = {
        labels: ['Total Income', 'Total Spending'],
        datasets: [
            {
                label: '# of Votes',
                data: [total.totalIncome, total.totalSpending],
                backgroundColor: [
                    // 'rgba(255, 99, 132, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    'rgb(255, 51, 153)',
                    'rgb(0, 153, 153)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect( () => {
        const checkLogin = () => {
            if(!cookies.load("accessToken")){
                nav("/login")
            }
        }
        checkLogin()
    }, [])
    return (
        <>
            <h1 className='title-view-spending'>THỐNG KÊ CHI TIÊU</h1>

            <div className='stats'>
                <div className='stats-left'>
                    <Doughnut className='stats' data={data} />
                </div>
                <div className='stats-right'>
                    <div className="form-group">
                        <label>From date:</label>
                        <input type="date" onChange={e => setFromDate(e.target.value)} name="fromDate" />
                    </div>
                    <div className="form-group">
                        <label>To date:</label>
                        <input type="date" onChange={e => setToDate(e.target.value)} />
                    </div>
                    <div className='info-total'>
                        <p>Total income: <span style={{color: '#ff0066', fontWeight: 'bold'}}>{format.format(total.totalIncome)}</span> VND</p>
                        <p>Total spending: <span style={{color: '#ff0066', fontWeight: 'bold'}}>{format.format(total.totalSpending)}</span> VND</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Stats