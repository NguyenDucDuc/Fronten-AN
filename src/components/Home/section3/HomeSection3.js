import "./HomeSection3.scss"
import card from "../../../img/f-icon2.png"
import card2 from "../../../img/f-icon1.png"
import card3 from "../../../img/f-icon3.png"

const HomeSection3 = () => {
    return(
        <>
            <h1 className="title-home-section3">APP FEATURES</h1>
            <section className="section3">
                <div className="card">
                    <img src={card} />
                    <h4>Fiendly with everyone</h4>
                    <p>
                    Intuitive and easy to use application for everyone. Everyone can easily manage their spending.
                    </p>
                    <button>Read more</button>
                </div>

                <div className="card">
                    <img src={card2} />
                    <h4>Fiendly with everyone</h4>
                    <p>
                    Intuitive and easy to use application for everyone. Everyone can easily manage their spending.
                    </p>
                    <button>Read more</button>
                </div>

                <div className="card">
                    <img src={card3} />
                    <h4>Fiendly with everyone</h4>
                    <p>
                    Intuitive and easy to use application for everyone. Everyone can easily manage their spending.
                    </p>
                    <button>Read more</button>
                </div>
            </section>
        </>
    )
}

export default HomeSection3