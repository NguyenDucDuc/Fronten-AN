import './HomeSection1.scss'
import phone from "../../../img/home-img.png"
import { useNavigate } from 'react-router-dom'
import { authAPI, endpoints } from '../../configs/API'

const HomeSection1 = () => {
    const nav = useNavigate()
    const goToRegister = async (event) => {
        event.preventDefault()
        nav("/register")

            const res = await authAPI().get(endpoints["getAllWarning"])
            console.log(res.data)

    }
    return (
        <>
            <section className="section1">
                <div className="section1-left">
                    <h1><span>Simple spending</span> managerment</h1>
                    <p>Bạn đang muốn quản lý nguồn tiền của mình một cách đơn giản. Hãy đến với chúng tôi, bấm 
                        nút đăng ký ở bên dưới, việc còn lại để chúng tôi lo.
                    </p>
                    <button onClick={goToRegister}>Register</button>
                </div>
                <div className="section1-right">
                    <img src={phone} />
                </div>
            </section>
        </>
    )
}


export default HomeSection1