import { useState } from "react"
import './HomeSection5.scss'
import contact from '../../../img/contact-img.png'


const HomeSection5 = () => {
    return (
        <>
            <div className="home-section5">
                <div className="left">
                    <img src={contact} />
                </div>
                <div className="right">
                    <h1>LIÊN HỆ VỚI CHÚNG TÔI NGAY THÔI</h1>
                </div>
            </div>
        </>
    )
}

export default HomeSection5