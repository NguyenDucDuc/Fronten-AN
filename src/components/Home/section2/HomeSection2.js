import "./HomeSection2.scss"
import phone from "../../../img/about-img.png"
// import { socket } from "../../../App"

const HomeSection2 = () => {
    const test = (event) => {
        event.preventDefault()
        // socket.emit("test", "test")
    }
    return (
        <>
            <h1 className="title-about-app">ABOUT THE APP</h1>
            <section className="section2">
                <div className="section2-left">
                    <img src={phone} />
                </div>
                <div className="section2-right">
                    <h1>Simple and easy to <span>manager spending money</span></h1>
                    <p>Đây là một ứng dụng rất dễ sử dụng đối với mọi người, ứng dụng sẽ mang đến cho mọi người những trải nghiệm tốt nhất.</p>
                    <p>Không dừng lại ở đó, ứng dụng này sẽ miễn phí đối với tất cả mọi người.</p>
                    <div className="group-button">
                        <button onClick={test}><i class="fa-brands fa-google-play"></i>Google Play</button>
                        <button className="btn-apple-store"><i class="fa-brands fa-apple"></i>Apple Store</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeSection2