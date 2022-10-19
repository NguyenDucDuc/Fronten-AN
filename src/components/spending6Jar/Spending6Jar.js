import "./Spending6Jar.scss"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSpendingJarAsyncThunk } from "../store/SpendingJarSlice"
import { Spinner } from "react-bootstrap"

const Spending6Jar = () => {
    const [select, setSelect] = useState("NEC")
    const dispatch = useDispatch()
    const status = useSelector(state => state.spendingJar.status)
    const formik = useFormik({
        initialValues: {
            money: null,
            purpose: "",
        },
        validationSchema: Yup.object({
            money: Yup.number().required("Required").min(1000, "Số tiền phải từ 1.000 VND"),
            purpose: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            const reqBody = {
                money: values.money,
                purpose: values.purpose,
                jar: select
            }
            dispatch(addSpendingJarAsyncThunk(reqBody))

        }
    })
    return (
        <>
            <div className="add-spending-jar">
                <div className="doc">
                    <h4 style={{textAlign: "center"}}>CHI TIÊU THÔNG MINH VỚI 6 CHIẾC HŨ</h4>
                    <p><span style={{color: "#ff0066", fontWeight: "bold", fontSize: "20px"}}>LỌ SỐ 1: CHI TIÊU CẦN THIẾT - NEC (55% THU NHẬP)</span><br></br>
                        Quỹ Chi tiêu cần thiết (NEC) giúp bạn đảm bảo nhu cầu thiết yếu, sinh hoạt hàng ngày của cuộc sống. Quỹ NEC này cũng sử dụng cho các mục đích ăn uống, sinh hoạt, chi trả hóa đơn, vui chơi, giải trí và mua sắm cần thiết. Đây là lọ chiếm phần trăm thu nhập của bạn cao nhất.

                        Nếu bạn đang sử dụng quá 80% thu nhập cho các chi tiêu cần thiết, bạn cần tăng cường tổng thu nhập hoặc thay đổi lối sống, cắt giảm chi tiêu.</p>
                    <p>
                    <span style={{color: "#ff0066", fontWeight: "bold", fontSize: "20px"}}>LỌ SỐ 2: TIẾT KIỆM DÀI HẠN - LTS (10% THU NHẬP)</span><br></br>
                        Bạn sử dụng khoản tiết kiệm dài hạn (LTS) này cho những mục tiêu dài hạn, lớn hạn như mua xe, mua nhà, sinh em bé, thực hiện ước mơ... Có quỹ LTS sẽ giúp bạn thấy được mục đích mình nhắm tới, và có động lực tiết kiệm dần dần cho việc đó.
                    </p>
                    <p>
                    <span style={{color: "#ff0066", fontWeight: "bold", fontSize: "20px"}}>LỌ SỐ 3: QUỸ GIÁO DỤC - EDU (10% THU NHẬP)</span><br></br>
                        Bạn cần trích 10% thu nhập cho việc học thêm, trau dồi kiển thức của bạn thân. Bạn có thể dùng quỹ giáo dục (EDU) này để mua sách, tham gia các khóa học, đào tạo, các buổi gặp gỡ chia sẻ từ những người thành công.
                    </p>
                    <p>
                    <span style={{color: "#ff0066", fontWeight: "bold", fontSize: "20px"}}>LỌ SỐ 4: HƯỞNG THỤ - PLAY (10% THU NHẬP)</span><br></br>
                        Đây là khoản tiền bạn dành cho việc hưởng thụ, mua sắm xa xỉ, chăm lo cho bản thân, làm những việc mới mẻ, tăng cường trải nghiệm...
                    </p>
                    <p>
                    <span style={{color: "#ff0066", fontWeight: "bold", fontSize: "20px"}}>LỌ SỐ 5: QUỸ TỰ DO TÀI CHÍNH - FFA (10% THU NHẬP)</span><br></br>
                        Tự do tài chính (FFA) là khi bạn có một cuộc sống như mong muốn mà không cần làm việc hay phụ thuộc tài chính vào người khác. FFA là khoản bạn sử dụng để tham gia các hoạt động tạo ra thu nhập thụ động như gửi tiết kiệm, đầu tư, góp vốn kinh doanh.
                    </p>
                    <p>
                    <span style={{color: "#ff0066", fontWeight: "bold", fontSize: "20px"}}>LỌ SỐ 6: QUỸ TỪ THIỆN - GIVE (5% THU NHẬP)</span><br></br>
                        Đây là khoản tiền bạn sử dụng để làm từ thiện, giúp đỡ cộng đồng, người thân, bạn bè. Nếu bạn có nhiều thứ phải chi trả hơn, hãy giảm tỷ lệ này xuống, nhưng luôn trích một khoản để giúp đỡ người khác.
                    </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <h1>CHI TIÊU THÔNG MINH</h1>
                    <div className="form-group">
                        <label>Số tiền: </label>
                        <input type="text" placeholder="nhập số tiền VND" id="money" name="money" value={formik.values.money} onChange={formik.handleChange} />
                        {formik.errors.money && <p className="errMsg">{formik.errors.money}</p>}
                    </div>
                    <div className="form-group">
                        <label>Mục đích: </label>
                        <input type="text" placeholder="nhập mục đích" id="purpose" name="purpose" value={formik.values.purpose} onChange={formik.handleChange} />
                        {formik.errors.purpose && <p className="errMsg">{formik.errors.purpose}</p>}
                    </div>
                    <div className="form-group">
                        <label>Chọn loại: </label>
                        <select value={select} onChange={e => setSelect(e.target.value)}>
                            <option value="NEC">Chi tiêu thiết yếu</option>
                            <option value="LTS">Tiết kiệm dài hạn</option>
                            <option value="EDU">Chi tiêu giáo dục</option>
                            <option value="PLAY">Hưởng thụ</option>
                            <option value="FFA">Tự do tài chính</option>
                            <option value="GIVE">Từ thiện</option>
                        </select>
                    </div>
                    {status === "loading" ? <Spinner className="spinner" animation="border" variant="danger" /> : <button type="submit">Thêm</button>}
                </form>
            </div>
        </>
    )
}

export default Spending6Jar