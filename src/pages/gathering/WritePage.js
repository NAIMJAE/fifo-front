import React, { useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { articleWriteApi } from '../../api/articleApi';
import { RootUrl } from '../../api/RootUrl';
import { changeImages } from '../../components/common/toast/ImageProcessing';
import EditorComponent from '../../components/common/toast/EditorComponent';

/** 입력한 태그 이전 상태 저장 (태그 개수 제한) */
let prevValue = "";

const Write = () => {

    /** 임시 유저 정보 */
    const [user, setUser] = useState(1);

    /** 게시글 제목 저장 */
    const [title, setTitle] = useState("");

    /** 카테고리 저장 */
    const [cate, setCate] = useState("");

    /** 모임 유형 저장 */
    const [groupType, setGroupType] = useState("");

    /** 모임 방식 저장 */
    const [meetingMethod, setMeetingMethod] = useState("");

    /** 게시글 내용 저장 */
    const editorRef = useRef();

    /** 첨부파일 이름 보여주기 */
    const [fileList, setFileList] = useState([]);
    const [fileNameList, setFileNameList] = useState([]);

    const createFile = (event) => {
        const files = event.target.files;
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
        } else {
            prevValue = inputTag;
            setTagList(tagArray);
        }
    }

    /** 게시글 작성 */
    const handleSubmit = async () => {
        // 게시글 내용 꺼내오기
        let contents = editorRef.current.getInstance().getHTML();

        // 게시글 내용 속 이미지 변환 (changeImages 컴포넌트화 시킴)
        const resultData = await changeImages(contents);
        if (resultData !== null) {
            // null 체크 안하면 에러
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
        formData.append("groupType", groupType);
        formData.append("meetingMethod", meetingMethod);
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
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <MainLayout>

            <div className='cntRow gatheringTitle'>
                모임 생성?
            </div>

            <div className='cntRow gatheringCateGroup'>
                <div className='selectGroup'>
                    <span>모임 유형</span>
                    <div className='groupType'>
                        <button className={groupType === '프로젝트' ? 'active' : ''} onClick={() => setGroupType('프로젝트')}>
                            프로젝트
                            <p>팀원을 모집해 <br/>사이트 프로젝트를<br/>진행해보세요.</p>
                        </button>
                        <button className={groupType === '스터디' ? 'active' : ''} onClick={() => setGroupType('스터디')}>스터디</button>
                        <button className={groupType === '모임' ? 'active' : ''} onClick={() => setGroupType('모임')}>모임</button>
                    </div>
                </div>
                <div className='selectGroup'>
                    <span>모임 방식</span>
                    <div className='meetingMethod'>
                        <button className={meetingMethod === '온/오프라인' ? 'active' : ''} onClick={() => setMeetingMethod('온/오프라인')}>온/오프라인</button>
                        <button className={meetingMethod === '온라인' ? 'active' : ''} onClick={() => setMeetingMethod('온라인')}>온라인</button>
                        <button className={meetingMethod === '오프라인' ? 'active' : ''} onClick={() => setMeetingMethod('오프라인')}>오프라인</button>
                    </div>
                </div>
            </div>

            <div className='cntRow gatheringData'>
                <div className='cntColumn'>
                    <span>모집 인원</span>
                    <select name="" id="">
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                        <option value="4">4명</option>
                    </select>
                </div>
                <div className='cntColumn'>
                    <span>모집 기간</span>
                    <div>
                        <input type="date" />
                        <b>~</b>
                        <input type="date" />
                    </div>
                </div>
            </div>

            <div className='cntRow gatheringData'>
                <div className='cntColumn'>
                    <span>모집 포지션</span>
                    <select name="" id="">
                        <option value="">백앤드</option>
                        <option value="">프론트앤드</option>
                        <option value="">디자이너</option>
                    </select>
                </div>
                <div className='cntColumn'>
                    <span>진행 기간</span>
                    <div>
                        <input type="date" />
                        <b>~</b>
                        <input type="date" />
                    </div>
                </div>
            </div>

            <div className='cntRow detail'>
                세부사항
            </div>

            <div className='cntRow articleTitle'>
                <input type="text" placeholder='제목' onChange={(e) => { setTitle(e.target.value) }} />
                <select name="" id="" onChange={(e) => { setCate(e.target.value) }}>
                    <option value="1">자유게시판</option>
                    <option value="2">업계소식</option>
                    <option value="3">면접후기</option>
                </select>
            </div>

            <div className='cntRow articleWrite'>
                <EditorComponent editorRef={editorRef} />
            </div>

            <div className='cntRow articleFile'>
                <input type="file" multiple onChange={createFile} />
                <div className='selected'>
                    {fileNameList ? fileNameList.map((file, index) => (
                        <span key={index}>{file}</span>
                    )) : (<></>)}
                </div>
            </div>

            <div className='cntColumn articleTag'>
                <input type="text" placeholder='#게시글 #태그 #추가' value={inputTag} onChange={createTag} />
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
