import classNames from "classnames/bind";
import style from "./scoreupPractice.module.scss"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Get } from "../../baseService/baseService";
const cx = classNames.bind(style)

export const ScoreUpPractice = () => {
    const navigate = useNavigate()
    const [selectCode, setSelectCode] = useState('')
    const [dataAlgorithm, setDataAlgorithm] = useState([])
    const [listAlgorithm, setListAlgorithm] = useState([])
    const CallApi = async () => {
        try {
            const data = await Get('/problem?typeOf=Cau_truc_du_lieu_va_giai_thuat')
            const list = await Get('/problem?typeOf=Thuat_toan')
            setDataAlgorithm(data?.data?.data)
            setListAlgorithm(list?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        CallApi()
    }, [])
    const handleOnchangeCode = (e) => {
        setSelectCode(e.target.value)
    }
    const handleDoHomework = () => {

        navigate(`/scoreup/practice/algorithm/${selectCode}`)
    }
    return (
        <div className={cx('practice')}>
            <div className={cx('imgBgr')}>
                <div className={cx('contentBgrImg')}>
                    <h1>Xin chào, meow!</h1>
                    <h5>Lướt xuống để bắt đầu luyện tập!</h5>
                </div>
            </div>
            <div className={cx('listPractice')}>

                <div className={cx('boxTitle')}>
                    <h3>Luyện tập cấu trúc dữ liệu và giải thuật</h3>
                    <p>Luyện tập các bài toán cơ bản và nâng cao về cấu trúc dữ liệu và giải thuật</p>
                    <select style={{ padding: 5, margin: "10px 0px" }} name="" id="" onChange={handleOnchangeCode}  >
                        <option value="">Chọn Thuật toán</option>
                        {
                            dataAlgorithm?.map((list, index) => {
                                return (
                                    <option key={index} value={list?._id}>{list?.title}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={() => handleDoHomework()} type="button" className={cx('btnTitle')}>Làm bài</button>

                </div>
                <div className={cx('boxTitle')}>
                    <h3>Thuật toán</h3>
                    <p>Tập hợp các bước tuần tự, có thứ tự, rõ ràng và hữu hạn, dùng để giải quyết một bài toán hoặc thực hiện một nhiệm vụ cụ thể</p>
                    <select style={{ padding: 5, margin: "10px 0px" }} name="" id="" onChange={handleOnchangeCode}  >
                        <option value="">Chọn Thuật toán</option>
                        {
                            listAlgorithm?.map((list, index) => {
                                return (
                                    <option key={index} value={list?._id}>{list?.title}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={() => handleDoHomework()} type="button" className={cx('btnTitle')}>Làm bài</button>
                </div>
            </div>
        </div>
    )
}