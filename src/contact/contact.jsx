import classNames from "classnames/bind";
import style from "./contact.module.scss"
import { useFormik } from "formik";
import * as Yup from "yup"
import { CButton, CForm, CFormInput, CFormTextarea } from "@coreui/react";
import { Input } from "../components/inputs/inputs";
import { Post } from "../baseService/baseService";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import LoadingButton from "../components/loadingButton/loadingButton";

const cx = classNames.bind(style)

export const Contact = () => {
    const [loading, setLoading] = useState(false)
    const location = {
        name: "Trường Đại Học Công Nghiệp Việt Hung",
        address: "KCN, Thạch Thất, Hà Nội, Việt Nam",
        lat: 21.020806847387483,
        lng: 105.60759250238073,
    };

    const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location.name)}@${location.lat},${location.lng}&z=15&output=embed`;
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            title: "",
            content: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Bạn vui lòng nhập họ và tên.'),
            phone: Yup.string().required('Bạn vui lòng nhập số điện thoại.'),
            email: Yup.string().required('Bạn vui lòng nhập email.'),
            title: Yup.string().required('Bạn vui lòng nhập tiêu đề.'),
            content: Yup.string().required('Bạn vui lòng nhập nội dung.')

        }),
        onSubmit: async (value) => {
            try {
                setLoading(true)
                const create = await Post('/contact/create', value)
                if (create.status === 200) {
                    toast.success('Thành công')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
    })
    return (
        <div className={cx('contact')}>
            <Toaster position="top-right" />
            <h3>Liên hệ với Chúng tôi</h3>
            <div className={cx('addressContact')}>
                <div className={cx('boxContact')}>
                    <h4>Địa chỉ</h4>
                    <div className={cx('info')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="2.4" fill="currentColor" />
                        </svg>
                        <span >KCN, Thạch Thất, Hà Nội</span>
                    </div>
                </div>
                <div className={cx('boxContact')}>
                    <h4>Số điện thoại</h4>
                    <div className={cx('info')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.8 3h2.4l2.4 6-1.8 1.2c1.2 2.4 3 4.2 5.4 5.4l1.2-1.8 6 2.4v2.4c0 1.2-1.2 2.4-2.4 2.4C9.6 21 3 14.4 3 6C3 4.2 3.6 3 4.8 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>0974.966.966</span>
                    </div>
                </div>
                <div className={cx('boxContact')}>
                    <h4>Email</h4>
                    <div className={cx('info')} >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>dhcnviethung.viu@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className={cx('mapAndFormContact')}>
                <div>
                    <iframe
                        src={mapEmbedUrl}
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    />

                </div>
                <div>
                    <p>Cảm ơn bạn đã quan tâm đến chúng tôi! Nếu bạn có bất kỳ câu hỏi, góp ý hoặc cần hỗ trợ, xin vui lòng điền vào biểu mẫu dưới đây. Nhấp vào nút "Gửi Tin Nhắn" để hoàn tất quá trình.
                        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Xin cảm ơn!
                    </p>
                    <CForm onSubmit={formik.handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            <Input placeholder={"Họ và tên"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                errors={formik.errors.name && formik.touched.name}
                                logError={formik.errors.name}
                                styleInput={{ padding: 20 }}
                                style={{ margin: 0 }}
                                type={"text"}
                                name={"name"}
                            />

                            <Input placeholder={"Số điện thoại"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                errors={formik.errors.phone && formik.touched.phone}
                                logError={formik.errors.phone}
                                styleInput={{ padding: 20 }}
                                style={{ margin: 0 }}
                                type={"text"}
                                name={"phone"}
                            />

                        </div>
                        <Input placeholder={"Email"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            errors={formik.errors.email && formik.touched.email}
                            logError={formik.errors.email}
                            styleInput={{ padding: 20 }}
                            style={{ margin: 0 }}
                            type={"text"}
                            name={"email"}
                        />
                        <Input placeholder={"Tiêu đề"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            errors={formik.errors.title && formik.touched.title}
                            logError={formik.errors.title}
                            styleInput={{ padding: 20 }}
                            style={{ margin: 0 }}
                            type={"text"}
                            name={"title"}
                        />
                        <div style={{ marginTop: 15 }}>
                            <CFormTextarea
                                id="exampleFormControlTextarea1"
                                placeholder="Nội dung"
                                rows={3}
                                name={"content"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.content}
                            ></CFormTextarea>
                            {formik.errors.content && formik.touched.content && (
                                <div className={cx('error')}>
                                    <p className={cx('pError')}>{formik.errors.content}</p>
                                </div>
                            )}
                        </div>

                        <CButton type={loading ? 'button' : 'submit'} className={cx('btnContact')} style={{ backgroundColor: "#0061bb", color: "#fff", padding: 10 }} >
                            {
                                loading ? <LoadingButton /> : <>Gửi tin nhắn</>
                            }
                        </CButton>
                    </CForm>

                </div>
            </div>
        </div>
    )
}