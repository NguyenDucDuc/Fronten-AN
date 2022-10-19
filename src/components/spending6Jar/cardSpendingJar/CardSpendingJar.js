import { confirmAlert } from "react-confirm-alert"
import { useDispatch } from "react-redux"
import { deleteSpendingJarAsyncThunk } from "../../store/SpendingJarSlice"
import "./CardSpendingJar.scss"


const CardSpendingJar = (props) => {
    const dispatch = useDispatch()
    const numberFormat = new Intl.NumberFormat('en-US')
    const deleteSpendingJar = (event) => {
        event.preventDefault()
        confirmAlert({
            title: "Xóa chi tiêu?",
            message: "Bạn có chắc chắn mốn xóa?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const info = {
                            spendingJarId: props.spendingJarId,
                            jar: props.jarType
                        }
                        console.log(info)
                        dispatch(deleteSpendingJarAsyncThunk(info))
                    },
                    style: {
                        backgroundColor: "#00cc66"
                    }
                },
                {
                    label: "No",
                    onClick: () => {

                    },
                    style: {
                        backgroundColor: "#ff0066"
                    }
                }
            ]
        })
    }
    return (
        <>
            <div className="card-spending-jar">
                <div className="left">
                    <div className="line"></div>
                    <div className="content">
                        <p>{props.purpose}</p>
                        <p>{props.createdAt}</p>
                    </div>

                </div>
                <div className="right">
                    <p style={{ fontSize: '22px' }}>{props.jar}</p>
                    <p>{numberFormat.format(props.money)} VND</p>
                    <i class="fa-regular fa-circle-xmark" onClick={deleteSpendingJar}></i>
                </div>
            </div>
        </>
    )
}

export default CardSpendingJar