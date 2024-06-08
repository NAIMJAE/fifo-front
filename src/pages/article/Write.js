import React, { useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

/** 입력한 태그 이전 상태 저장 (태그 개수 제한) */
let prevValue = "";

const Write = () => {

    /** 게시글 제목 저장 */
    const [title, setTitle] = useState("");
    /** 카테고리 저장 */
    const [cate, setCate] = useState("");
    /** 게시글 내용 저장 */
    const editorRef = useRef();
    
    /** 첨부파일 이름 보여주기 */
    const [fileList, setFileList] = useState([]);

    const createFile = (event) => {
        const files = event.target.files;
        const fileNames = Array.from(files).map(file => file.name);
        setFileList(fileNames);
    }

    /** 입력한 태그 자동 생성 */
    const [tagList, setTagList] = useState([]);
    const [inputTag, setInputTag] = useState("");

    const createTag = (event) => {
        setInputTag(event.target.value);
        const tagArray = inputTag.replace(/\s+/g, '').split("#").filter(tag => tag !== "");
        if (tagArray.length > 10) {
            alert("태그는 10개까지 생성가능합니다.");
            setInputTag(prevValue);
        }else {
            prevValue = inputTag;
            setTagList(tagArray);
        }
    }

    /** 게시글 작성 */
    const handleSubmit = () => {
        const contents = editorRef.current.getInstance().getHTML();
        console.log(contents);

    }

  return (
    <MainLayout>

        <div className='cntRow articleTitle'>
            <input type="text" placeholder='제목' onChange={(e)=>{setTitle(e.target.value)}}/>
            <select name="" id="" onChange={(e)=>{setCate(e.target.value)}}>
                <option value="cate">카테고리</option>
            </select>
        </div>

        <div className='cntRow articleWrite'>
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
        </div>

        <div className='cntRow articleFile'>
            <input type="file" multiple onChange={createFile}/>
            <div className='selected'>
                {fileList ? fileList.map((file, index) => (
                    <span key={index}>{file}</span>
                )) : (<></>)}
            </div>
        </div>

        <div className='cntColumn articleTag'>
            <input type="text" placeholder='#게시글 #태그 #추가' value={inputTag} onChange={createTag}/>
            <div className='cntWrapRow'>
                {tagList ? tagList.map((tag, index) => (
                    <span key={index} className='tag'>#{tag}</span>
                )) : (<></>)}

                
            </div>
        </div>

        <div className='cntRow writeBtn'>
            <button>취소</button>
            <button className='blue' onClick={handleSubmit}>작성</button>
        </div>

    </MainLayout>
  )
}

export default Write;