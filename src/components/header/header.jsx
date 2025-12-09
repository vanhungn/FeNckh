import classNames from "classnames/bind";
import style from "./header.module.scss"
import CIcon from "@coreui/icons-react";
import { cilHouse, cilSearch } from "@coreui/icons";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

const cx = classNames.bind(style)

export const Header = () => {
    const navigate = useNavigate()
    const handleNews = (query) => {
        navigate(`/information?info=${query}`)
    }
    return (
        <div className={cx('header')}>
            <div className={cx('categoryTop')}>
                <div className={cx('boxCategory')} onClick={() => navigate('/')}>
                    <CIcon icon={cilHouse} />
                    <span>Trang chủ</span>
                </div>
                <div className={cx('boxCategory')}>
                    <span>Tuyển sinh</span>
                </div>
                <div className={cx('boxCategory')}>
                    <span>CodeLap</span>
                </div>
                <div className={cx('boxCategory')} onClick={() => navigate('/contact')}>
                    <span>Liên hệ</span>
                </div>
                <div className={cx('boxCategory')}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>

            </div>
            <div className={cx('category')}>
                <div className={cx('boxLogo')}  >
                    <img className={cx('logo')} src="../../public/logokhoa.jpg" alt="" />
                    <div >
                        <p className={cx("nameVN")}>KHOA CÔNG NGHỆ THÔNG TIN</p>
                        <p className={cx('nameEl')}> Faculty of Information Technology</p>
                    </div>
                </div>
                <div className={cx('listCategory')}>
                    <div className={cx('boxCategoryBottom')}>
                        <p className={cx('title')}>GIỚI THIỆU</p>
                        <svg
                            className={cx('iconDown')}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 12 12"
                        >
                            <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                        </svg>
                        <div className={cx('categorySmall')}>

                            <p onClick={() => navigate('/introduce/department')}>Khoa công nghệ thông tin</p>
                            <p>Giảng viên - Cán bộ</p>

                        </div>

                    </div>
                    <div className={cx('boxCategoryBottom')}>
                        <p className={cx('title')}>ĐÀO TẠO</p>
                        <svg
                            className={cx('iconDown')}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 12 12"
                        >
                            <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                        </svg>


                    </div>
                    <div className={cx('boxCategoryBottom')}>
                        <p className={cx('title')}>NGHIÊN CỨU</p>
                        <svg
                            className={cx('iconDown')}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 12 12"
                        >
                            <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                        </svg>
                        <div className={cx('categorySmall')}>
                            <p onClick={() => handleNews("topic")}>Đề tài</p>
                            <p onClick={() => handleNews("seminar")}>Hội thảo</p>
                            <p onClick={() => handleNews("scientificResearchLecturer")}>Nghiên cứu khoa học Giảng viên</p>
                            <p onClick={() => handleNews("studentScientificResearch")}>Nghiên cứu khoa học Sinh viên</p>


                        </div>


                    </div>
                    <div className={cx('boxCategoryBottom')}>
                        <p className={cx('title')}>THÔNG TIN</p>
                        <svg
                            className={cx('iconDown')}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 12 12"
                        >
                            <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                        </svg>
                        <div className={cx('categorySmall')}>
                            <p onClick={() => handleNews("generalNews")}>Tin tổng hợp</p>
                            <p onClick={() => handleNews("enrollment")}>Tuyển sinh</p>
                            <p onClick={() => handleNews("event")}>Sự kiện</p>
                            <p onClick={() => handleNews("practice")}>Thực tập</p>
                            <p onClick={() => handleNews("studyTrip")}>Du học</p>

                        </div>
                    </div>
                    <div className={cx('boxCategoryBottom')}>
                        <p className={cx('title')}>SINH VIÊN</p>
                        <svg
                            className={cx('iconDown')}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 12 12"
                        >
                            <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                        </svg>
                        <div className={cx('categorySmall')}>
                            <p onClick={() => handleNews("toGuide")}>Hướng dẫn</p>
                            <p onClick={() => handleNews("notify")}>Thông báo</p>
                            <p onClick={() => handleNews("rules")}>Quy định</p>
                            <p onClick={() => handleNews("active")}>Hoạt động</p>
                            <p onClick={() => handleNews("studyGuide")}>Hướng dẫn học tập</p>
                            <p onClick={() => handleNews("itClub")}>Câu lạc bộ IT</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}