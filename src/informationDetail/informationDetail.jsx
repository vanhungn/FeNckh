import classNames from "classnames/bind";
import style from "./informationDetail.module.scss"
import { useEffect, useState } from "react";
import { Get } from "../baseService/baseService";
import { useParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilAlarm } from "@coreui/icons";
import { CButton } from "@coreui/react";
import BANNER from "../components/listBgrInfo";
import {Output} from "@react-editor-js/client";


const cx = classNames.bind(style)

export const InformationDetail = () => {
    const [dataDetail, setDataDetail] = useState({})
    const [suggest, setSuggest] = useState([])
    const { _id } = useParams()
    const callApi = async () => {
        try {
            const data = await Get(`/news/detail/${_id}`)
            setDataDetail(data.data.data)
            setSuggest(data.data.dataSuggest)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        callApi()
    }, [])
    const d = new Date(dataDetail.createdAt);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    const time = `${day}/${month}/${year}`;

    const titleNavigate = BANNER?.filter((q) => q?.keyName === dataDetail?.typeOf)
    console.log(dataDetail?.content)
    return (
        <div className={cx('information')}>
            <div className={cx('banner')} style={{ backgroundImage: `url(${dataDetail?.img?.url})` }}>
                <div className={cx('contentBanner')}>
                    <h3>{dataDetail?.title}</h3>
                    <div style={{ display: "flex", gap: '10px', alignItems: "center" }}>
                        <p className={cx('time')}>
                            <CIcon icon={cilAlarm} size="lg" /> <span>{time}</span>
                        </p>
                        <CButton className={cx('btnNavigate')} type="button" >{titleNavigate[0]?.title}</CButton>
                    </div>
                </div>
                <div className={cx('shadow')}></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginTop: 30 }}>
                <div>
                    <Output data={dataDetail?.content} />
                </div>
            </div>
        </div>
    )
}