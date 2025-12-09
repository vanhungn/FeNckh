import classNames from "classnames/bind";
import style from "./doTheory.module.scss";
import { useEffect, useState } from "react";
import { Get } from "../../baseService/baseService";
import { useParams } from "react-router-dom";
import { SolidQuestion } from "../../components/SolidQuestion/SolidQuestion";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { ModalInform } from "../../components/Modal/Modal";
const cx = classNames.bind(style);

export const DoTheory = () => {
    const [answers, setAnswers] = useState({}); // lưu key đã chọn: { questionIndex: key }
    const [submitted, setSubmitted] = useState(false);
    const { code } = useParams();
    const [dataTheory, setDataTheory] = useState({});
    const [visible, setVisible] = useState(false)
    const [result, setResult] = useState("")
    const CallApi = async () => {
        try {
            const res = await Get(`/theory/list/${code}`);
            setDataTheory(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        CallApi();
    }, [code]);

    const handleSelect = (key, questionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: key // lưu key đã chọn
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        let score = 0;
        dataTheory.list.forEach((q, index) => {
            if (answers[index] === q.answer) {
                score++;
            }
        });
        setResult(` ${score} / ${dataTheory.list.length}`);
        let checkId = JSON.parse(localStorage.getItem("historyID")) || [];

        if (checkId.some(item => item.id === code)) {
            checkId = checkId.map((item) => {
                if (item.id === code) {
                    return {
                        ...item,
                        result: ` ${score} / ${dataTheory.list.length}`
                    }
                }
                return item
            })
        } else {

            checkId.push({
                id: code, name: dataTheory.chapter, result: ` ${score} / ${dataTheory.list.length}`
            })

        }
        localStorage.setItem("historyID", JSON.stringify(checkId));

    };
    return (

        <div className={cx('theory')}>

            <form >
                <div className={cx("doTheory")}>
                    <div className={cx("header")}>
                        <h2>{dataTheory?.chapter}</h2>

                    </div>
                    <div style={{ display: submitted ? "flex" : "none", justifyContent: "flex-end", margin: "40px 0 0 0 " }}>
                        <h5>
                            Điểm: {result}
                        </h5>

                    </div>
                    <div className={cx("questionList")}>
                        {dataTheory?.list?.map((item, index) => (
                            <SolidQuestion
                                key={index}
                                index={index}
                                title={item.question}
                                img={item.imgUrl}
                                options={item.options} // options phải có key: "A","B","C"
                                selected={answers[index]}
                                onSelect={handleSelect}
                                answer={item} // mỗi câu có correctKey
                                submitted={submitted}
                            />
                        ))}
                    </div>
                    <ModalInform result={`${Object.keys(answers).length}/${dataTheory?.list?.length||0}`} handleSubmit={handleSubmit} setVisible={setVisible} visible={visible} />
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: '20px', gap: 20 }}>
                        <CButton style={{ cursor: "pointer" }} color="primary" disabled={submitted} onClick={() => setVisible(!visible)}>
                            Nộp bài
                        </CButton>
                        <CButton style={{ cursor: "pointer" }} color="danger" onClick={() => window.location.reload()}>
                            Làm lại
                        </CButton>
                    </div>

                </div>
            </form>
        </div>
    );
};
