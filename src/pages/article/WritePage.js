import React, { useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { articleWriteApi } from '../../api/articleApi';
import { v4 as uuidv4 } from 'uuid';
import { RootUrl } from '../../api/RootUrl';

/** 입력한 태그 이전 상태 저장 (태그 개수 제한) */
let prevValue = "";

const Write = () => {

/** 임시 유저 정보 */
    const [user, setUser] = useState(1);

/** 게시글 제목 저장 */
    const [title, setTitle] = useState("");

/** 카테고리 저장 */
    const [cate, setCate] = useState("");

/** 게시글 내용 저장 */
    const editorRef = useRef();
    
/** 첨부파일 이름 보여주기 */
    const [fileList, setFileList] = useState([]);
    const [fileNameList, setFileNameList] = useState([]);

    const createFile = (event) => {
        const files = event.target.files;
        console.log(typeof files)
        setFileList(files);
        const fileNames = Array.from(files).map(file => file.name);
        setFileNameList(fileNames);
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
    const handleSubmit = async () => {
        // 게시글 내용 꺼내오기
        let contents = editorRef.current.getInstance().getHTML();
        
        // 게시글 내용 속 이미지 변환
        const resultData = await changeImages(contents);
        if (resultData !== null) {
            resultData.imageList.forEach((image, i) => {
                const imageURL = `${RootUrl()}/uploads/post/images/${image.name}`;
                contents = contents.replace(resultData.srcPull[i].slice(5, -1), imageURL);
            });
        }

        // 필요한 데이터 formData에 담기
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", contents);
        formData.append("cateNo", cate);
        formData.append("userNo", user);
        formData.append("tag", inputTag);
        for (let i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i]);
        }
        if (resultData !== null) {
            for (let i = 0; i < resultData.imageList.length; i++) {
                formData.append('images', resultData.imageList[i]);
            }
        }

        // 서버 전송
        try {
            const response = await articleWriteApi(formData);
            console.log(response);
        }catch (err) {
            console.log(err);
        }
    }

/** 게시글에서 base64 추출 */
    const changeImages = async (contents) => {
        const matchSrc = /src="([^"]*)"/g;
        const srcPull = contents.match(matchSrc);
        console.log(srcPull);

        let imageList = [];
        if (srcPull !== null) {
            for (let i = 0; i < srcPull.length; i++) {
                const base64 = srcPull[i].slice(5, -1);  // base64 코드
                const imgData = base64.match(/data:(.*?);/)[1];  // 이미지 data
                const extension = imgData.split('/')[1];  // 확장자
                const fileName = `${uuidv4()}.${extension}`;  // 랜덤 이름 생성
                
                const file = base64ToFile(base64, fileName);  // 게시글 이미지 변환 (base64 -> file)
                imageList.push(file);
            }
        }else {
            return null;
        }
        const resultData = {
            imageList : imageList,
            srcPull : srcPull
        }
        console.log(resultData);
        return resultData;
    }

/** 게시글 이미지 변환 (base64 -> file) */
    const base64ToFile = (base64, fileName) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    };



  return (
    <MainLayout>

        <div className='cntRow articleTitle'>
            <input type="text" placeholder='제목' onChange={(e)=>{setTitle(e.target.value)}}/>
            <select name="" id="" onChange={(e)=>{setCate(e.target.value)}}>
                <option value="1">자유게시판</option>
                <option value="2">업계소식</option>
                <option value="3">면접후기</option>
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
                {fileNameList ? fileNameList.map((file, index) => (
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