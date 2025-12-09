import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
import Quote from '@editorjs/quote';
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import Delimiter from "@editorjs/delimiter";

import { Post } from "../../baseService/baseService";

export const EditorjsTools = {
    header: {
        class: Header,
        config: {
            placeholder: 'Nhập tiêu đề...',
            levels: [2, 3, 4],
            defaultLevel: 2
        }
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
            placeholder: 'Nhập nội dung...'
        }
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        },
    },
    image: {
        class: ImageTool,
        config: {
            // ⚠️ Bỏ endpoints vì dùng custom uploader
            field: 'image',
            captionPlaceholder: 'Thêm chú thích cho ảnh...',
            buttonContent: 'Chọn ảnh',

            uploader: {
                async uploadByFile(file) {
                    try {
                        const formData = new FormData();
                        formData.append('image', file);

                        // ✅ Gọi API và xử lý response
                        const response = await Post('/news/uploadFile', formData);

                        console.log('Upload response:', response);

                        // ⚠️ Xử lý nếu response có wrap trong data
                        if (response.data) {

                            return response.data; // { success: 1, file: { url: "..." } }
                        }

                        return response; // Trả về trực tiếp

                    } catch (error) {
                        console.error('Upload error:', error);
                        return {
                            success: 0,
                            message: error.message || 'Upload failed'
                        };
                    }
                },

                async uploadByUrl(url) {
                    try {
                        // ✅ Gửi đúng format { url: "..." }
                        const response = await Post('/news/fetchUrl', { url });

                        console.log('Fetch URL response:', response);

                        // ⚠️ Xử lý nếu response có wrap trong data
                        if (response.data) {
                            return response.data;
                        }

                        return response;

                    } catch (error) {
                        console.error('Fetch URL error:', error);
                        return {
                            success: 0,
                            message: error.message || 'Fetch URL failed'
                        };
                    }
                }
            }
        }
    },
    table: {
        class: Table,
        inlineToolbar: true,
        config: {
            rows: 2,
            cols: 3,
        }
    },

    anyTuneName: {
        class: AlignmentTuneTool,
        config: {
            default: "right",
            blocks: {
                header: 'center',
                list: 'right'
            }
        },
    },
    quote: Quote,
    delimiter: Delimiter

};