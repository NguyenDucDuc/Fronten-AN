import "./Footer.scss"
import bgFooter from '../../img/subscribe-bg.png'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer-items">
                    <div className="quick-link col">
                        <p>QUICK LINK</p>
                        <ul className="list">
                            <li><Link to='/'>Add Income Spending</Link></li>
                            <li><Link to='/'>View Income Spending</Link></li>
                            <li><Link to='/'>Register</Link></li>
                            <li><Link to='/'>Login</Link></li>
                            <li><Link to='/'>Admin Page</Link></li>
                        </ul>
                    </div>
                    <div className="follow-us col">
                        <p>FOLLOW US</p>
                        <ul className="list">
                            <li><Link to='/'><i class="fa-brands fa-facebook"></i>Facebook</Link></li>
                            <li><Link to='/'><i class="fa-brands fa-instagram"></i>Instagram</Link></li>
                            <li><Link to='/'><i class="fa-brands fa-twitter"></i>Twitter</Link></li>
                            <li><Link to='/'><i class="fa-brands fa-tiktok"></i>Tik tok</Link></li>
                            <li><Link to='/'><i class="fa-brands fa-whatsapp"></i>Zalo</Link></li>
                        </ul>
                    </div>
                    <div className="contact-info col">
                        <p>CONTACT INFO</p>
                        <ul className="list">
                            <li><Link to='/'><i class="fa-solid fa-phone"></i>0356 879 921</Link></li>
                            <li><Link to='/'><i class="fa-solid fa-location-dot"></i>623 Điện Biên Phủ</Link></li>
                            <li><Link to='/'><i class="fa-regular fa-envelope"></i>nguyenducduc240401@outlock.com</Link></li>
                        </ul>   
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer