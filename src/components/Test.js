import { useEffect, useState } from 'react'
import Chat from './Chat'
import './Test.scss'


const Test = () => {
    const [count, setCount] = useState(0)
    
    
    

    return (
        <>
            <h1>{count}</h1>
            <div className='test1'>
                <h1>asd</h1>
                <h1>asd</h1>
                <h1>asd</h1>
                <div className='test'></div>
            </div>
            <div className='test2'>

            </div>
            <Chat />
        </>
    )
}

export default Test