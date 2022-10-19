import "./CardMessage.scss"

const CardMessage = (props) => {
    return (
        <>
            <div className="card-message">
                <div className="card-message-left">
                    <img src={props.data.userId.avatar} />
                    
                </div>
                <div className="card-message-right">
                    {props.data.userId.fullname ? <p>{props.data.userId.fullname}</p> : <p>No name</p>}
                    
                    <p>{props.data.content}</p>
                </div>
            </div>
        </>
    )
}

export default CardMessage