import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./document.module.scss";
import { useNavigate } from "react-router-dom";
import { Get, Post } from "../../baseService/baseService";
const cx = classNames.bind(style);

export const Document = () => {
    const navigate = useNavigate()
    const [selectCode, setSelectCode] = useState('')
    const [dataAlgorithm, setDataAlgorithm] = useState([])
    const CallApi = async () => {
        try {

            const data = await Get('/document')
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
    const handleDoHomework = (_idCourse) => {

        navigate(`/scoreup/document/docx?_idCourse=${_idCourse}&selectCode=${selectCode}`)
    }

    const handleSearch = async (e) => {
        const value = e.target.value
        const data = await Get(`/document?search=${value}`)
        setDataAlgorithm(data?.data?.data)
    }

    return (
        <div className={cx('practice')}>
            <div className={cx('search')}>
                <input className={cx('inputSearch')} type="text" placeholder="Tìm tên môn" name="" id="" onChange={handleSearch} />
            </div>
            <div className={cx('listPractice')}>
                {dataAlgorithm?.map((item, index) => {
                    return (
                        <div key={index} className={cx('boxTitle')}>
                            <h3>{item.course}</h3>
                            <select style={{ width: "100%", padding: 5, margin: "10px 0px" }} name="" id="" onChange={handleOnchangeCode}  >
                                <option value="">Chọn tài liệu</option>
                                {
                                    item.docx.map((product, index) => {
                                        return (
                                            <option key={index} value={product._id}>{product.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <button onClick={() => handleDoHomework(item._id)} type="button" className={cx('btnTitle')}>Xem tài liệu</button>

                        </div>
                    )
                })
                }
            </div>
        </div>
    )
};
