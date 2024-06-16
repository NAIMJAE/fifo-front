import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

import React from 'react'

/** editorRef 는 Editor에 입력한 데이터가 저장되는 Hook */

const EditorComponent = ({editorRef}) => {
  return (
    <Editor
        initialValue="내용"
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        plugins={[colorSyntax]}
        language="ko-KR"
        ref={editorRef}
    />
  )
}

export default EditorComponent