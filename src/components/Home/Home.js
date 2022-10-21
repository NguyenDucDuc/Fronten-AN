
import { Row, Col } from "react-bootstrap"
import phone from "../../img/home-img.png"
import phone2 from "../../img/about-img.png"
import "./Home.scss"
import subscribeBg from "../../img/subscribe-bg.png"
import { Link, useNavigate } from "react-router-dom"
import HomeSection1 from "./section1/HomeSection1"
import HomeSection2 from "./section2/HomeSection2"
import HomeSection3 from "./section3/HomeSection3"
import HomeSection4 from "./section4/HomeSection4"
import HomeSection5 from "./section5/HomeSection5"


const Home = () => {
    const nav = useNavigate()
    return (
        <>
            <HomeSection1 />
            <HomeSection2 />
            <HomeSection3 />
            <HomeSection4 />
            <HomeSection5 />
        </>
    )
}

export default Home