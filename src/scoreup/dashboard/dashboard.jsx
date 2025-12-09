import classNames from "classnames/bind";
import style from './dashboard.module.scss';
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style)

export const Dashboard = () => {
    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem('historyID'))
    const handleDoAgain = (id) => {
        navigate(`/scoreup/practice/theory/${id}`)
    }
    return (
        <div className={cx('practice')}>
            <div className={cx('imgBgr')}>
                <div className={cx('contentBgrImg')}>
                    <h1>Xin chào, meow!</h1>
                    <h5>Chúc bạn một ngày tốt lành!</h5>
                </div>
            </div>
            <h3><b>Lịch sử làm bài</b> </h3>
            <div className={cx('listPractice')}>
                {
                    data?.map((item, index) => {
                        return (
                            <div className={cx('boxTitle')} key={index}>

                                <h3>{item.name}</h3>
                                <h5>Điểm: {item.result}</h5>
                                <button type="button" onClick={() => handleDoAgain(item.id)} className={cx('btnTitle')}>Làm lại</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}