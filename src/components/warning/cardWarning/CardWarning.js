import "./CardWarning.scss"


const CardWarning = (props) => {
    return(
        <>
            <div className="card-warning">
                <div className="line">

                </div>
                <div className="icon">
                    <i class="fa fa-triangle-exclamation"></i> 
                </div>
                <div className="content">
                    <p>{props.content}</p>
                </div>
            </div>
        </>
    )
}

export default CardWarning