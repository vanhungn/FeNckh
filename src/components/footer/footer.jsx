import classNames from "classnames/bind";
import style from "./footer.module.scss"
const cx = classNames.bind(style)
export const Footer = () => {
    return (
        <div className={cx('footer')}>
            <div className={cx('lobby')}>
                <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                    <h3>Địa chỉ liên hệ</h3>
                    <div className={cx('infoAddress')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                        </svg>
                        <span >KCN, Thạch Thất, Hà Nội</span>
                    </div>
                    <div className={cx('infoAddress')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.8 3h2.4l2.4 6-1.8 1.2c1.2 2.4 3 4.2 5.4 5.4l1.2-1.8 6 2.4v2.4c0 1.2-1.2 2.4-2.4 2.4C9.6 21 3 14.4 3 6C3 4.2 3.6 3 4.8 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>0974.966.966</span>
                    </div>
                    <div className={cx('infoAddress')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>dhcnviethung.viu@gmail.com</span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <div className={cx('boxInfor')}>
                            <a target="_blank" href="https://www.facebook.com/cnttvh">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 10h3l-.4 4H13v10h-4V14H7v-4h2.2V7.8C9.2 5 10.6 3 14 3h3v4h-2c-.9 0-2 .5-2 2V10z" />
                                </svg>
                            </a>

                        </div>
                        <div className={cx('boxInfor')}>
                            <a target="_blank" href="https://www.youtube.com/@quangvinhxk">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M23.498 6.186a2.998 2.998 0 0 0-2.113-2.118C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.385.568a2.998 2.998 0 0 0-2.113 2.118C0 7.892 0 12 0 12s0 4.108.502 5.814a2.998 2.998 0 0 0 2.113 2.118C4.308 20.5 12 20.5 12 20.5s7.692 0 9.385-.568a2.998 2.998 0 0 0 2.113-2.118C24 16.108 24 12 24 12s0-4.108-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>

            </div>
            <p style={{ textAlign: "center" }}>Ban Tuyển sinh - Đại học công nghiệp Việt Hung</p>

        </div>
    )
}