// editor.jsx
import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import { EditorjsTools } from "../tools/tools";
import classNames from "classnames/bind";
import style from "./editor.module.scss"
import { useLocation, useParams } from "react-router-dom";
const cx = classNames.bind(style)

const Editor = ({ data, onChange, readOnly, resetEditor, setResetEditor }) => {
  const editorRef = useRef(null);
  const holderRef = useRef(null);
  const indentLevels = useRef(new Map());
  const { _id } = useParams()
  const path = useLocation()
  const active = () => {
    if (editorRef.current) return;
    const editor = new EditorJS({
      holder: holderRef.current,
      tools: EditorjsTools,
      data,
      readOnly: readOnly,
      async onChange() {
        if (editorRef.current && !readOnly) {
          const output = await editorRef.current.save();
          onChange(output);
        }
      },
    });
    editorRef.current = editor;
    return () => {
      if (editorRef.current?.destroy) {
        try {
          editorRef.current.destroy();
        } catch (e) { }
        editorRef.current = null;
      }
    };
  }
  useEffect(() => {
    if (path.pathname === "/admin/news/create") {
      active()
    }
    else if (path.pathname === `/admin/news/update/${_id}`) {
      if (data) {
        active()
      }
    }

  }, []);
  useEffect(() => {
    if (data) {
      active()
    }
  }, [data])
  const resetEditorData = async (newData) => {
    if (editorRef.current) {
      await editorRef.current.destroy(); // ✅ cleanup instance cũ
      editorRef.current = null;
    }
    const editor = new EditorJS({
      holder: holderRef.current,
      tools: EditorjsTools,
      data: newData,
      readOnly,
      async onChange() {
        if (!readOnly) {
          const output = await editorRef.current.save();
          onChange(output);
        }
      },
    });

    editorRef.current = editor;
  };

  useEffect(() => {
    if (!resetEditor) {
      resetEditorData(data);   // reset editor với data mới
      setResetEditor(true);   // reset flag
    }
  }, [resetEditor]);
  useEffect(() => {
    if (editorRef.current?.readOnly) {
      editorRef.current.readOnly.toggle(readOnly);
    }
  }, [readOnly]);
  useEffect(() => {
    // ✅ Override Tab behavior ở window level (priority cao nhất)
    const handleTabCapture = (e) => {
      if (e.key !== 'Tab' && e.key !== 'Shift') return;

      // Kiểm tra có đang trong editor không
      if (!holderRef.current?.contains(e.target)) return;

      const currentBlock = e.target.closest('.ce-block');
      if (!currentBlock) return;
      // Nếu là Tab key
      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const blocks = holderRef.current.querySelectorAll('.ce-block');
        const blockIndex = Array.from(blocks).indexOf(currentBlock);

        let currentIndent = indentLevels.current.get(blockIndex) || 0;

        if (e.shiftKey) {
          currentIndent = Math.max(0, currentIndent - 1);
        } else {
          currentIndent = Math.min(10, currentIndent + 1);
        }

        indentLevels.current.set(blockIndex, currentIndent);

        // Áp dụng style
        const blockContent = currentBlock.querySelector('.ce-block__content');
        if (blockContent) {
          blockContent.style.paddingLeft = `${currentIndent * 40}px`;
          blockContent.style.transition = 'padding-left 0.15s ease';

          // Thêm visual indicator
          blockContent.style.borderLeft = currentIndent > 0
            ? `3px solid rgba(66, 133, 244, ${0.2 + currentIndent * 0.08})`
            : 'none';
        }

        console.log(`📝 Block ${blockIndex}: Level ${currentIndent}`);

        // Return false để chặn hoàn toàn
        return false;
      }
    };

    // ✅ Bắt ở window level với priority cao nhất
    window.addEventListener('keydown', handleTabCapture, true);

    return () => {
      window.removeEventListener('keydown', handleTabCapture, true);
    };
  }, []);

  return <div ref={holderRef} className={cx('editor')}
  ></div>;
};

export default memo(Editor);