import { PayPalButtons } from '@paypal/react-paypal-js'
import './Donate.scss'
import burger from '../../img/humburger.jpg'
import pizza from '../../img/pizza.webp'
import milktea from '../../img/milktea.webp'
import combo from '../../img/combo.png'


const Donate = () => {
    const listDonate = [
        {
            name: 'Milk tea',
            value: '10.00',
            img: milktea
        },
        {
            name: 'Burger',
            value: '20.00',
            img: burger,
        },
        {
            name: 'Pizza',
            value: '50.00',
            img: pizza,
        },
        {
            name: 'Combo',
            value: '80.00',
            img: combo
        }
    ]
    return (
        <>
            <div className='donate'>
                {listDonate.map((d, idx) => <CardDonate value={d.value} name={d.name} img={d.img} key={idx} />)}
            </div>
            {/* <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "10.00",
                                },
                            },
                        ],
                    });
                }}
                fundingSource = 'paypal'
                style={{
                    color: 'silver',
                    shape: 'pill',
                    height: 48,
                    tagline: false
                }}
            /> */}

        </>
    )
}


export const CardDonate = (props) => {
    return (
        <div className='card-donate'>
            <img src={props.img} alt='humburger' />
            <p>{props.name}  ${props.value}</p>
            <div className='paypal-btn'>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: props.value,
                                    },
                                },
                            ],
                        });
                    }}
                    style={{
                        color: 'silver',
                        shape: 'pill',
                    }}
                    fundingSource='paypal'
                />
            </div>

        </div>
    )
}

export default Donate