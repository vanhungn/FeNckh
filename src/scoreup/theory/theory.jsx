import classNames from "classnames/bind";
import style from "./theory.module.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Get } from "../../baseService/baseService";
const cx = classNames.bind(style)

export const ScoreUpPracticeTheory = () => {
    const navigate = useNavigate()
    const [selectCode, setSelectCode] = useState('')
    const [dataAlgorithm, setDataAlgorithm] = useState([])
    const CallApi = async () => {
        try {
            const data = await Get('/theory/chapter')

            setDataAlgorithm(data?.data?.data)
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

        navigate(`/scoreup/practice/theory/${selectCode}`)
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
                    <h3>Luyện thuyết cấu trúc dữ liệu và giải thuật</h3>
                    <p>Luyện tập các lý thuyết cơ bản và nâng cao hiểu biết cấu trúc dữ liệu và giải thuật</p>
                    <select style={{ padding: 5, margin: "10px 0px" }} name="" id="" onChange={handleOnchangeCode}  >
                        <option value="">Chọn chương</option>
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

            </div>
        </div>
    )
}