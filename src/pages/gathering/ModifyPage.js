import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import Breadcrumb from '../../components/common/main/Breadcrumb'
import EditorComponent from '../../components/common/toast/EditorComponent'
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HiddenInputFile from '../../components/gathering/HiddenInputFile';
import { useLocation, useNavigate } from 'react-router-dom'
import { changeImages } from '../../components/common/toast/ImageProcessing'
import { RootUrl } from '../../api/RootUrl'
import { useSelector } from 'react-redux'
import { gatheringModifyApi, gatheringViewApi } from '../../api/gatheringApi'

const ModifyPage = () => {

    const loginSlice = useSelector((state) => state.authSlice) || {};
    const navigate = useNavigate();

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let gathno = queryParams.get('gathno');

    /** 게시글 useState */
    const [gatheringView, setGatheringView] = useState({});

    /** 게시글 내용 저장 */
    const editorRef = useRef();

    /** 썸네일 이미지 저장 */
    const [thumbnail, setThumbnail] = useState(null);

    /** 썸네일 파일 이름 저장 */
    const [thumbnailName, setThumbnailName] = useState("");

    /** 수정할 게시글 조회 */
    useEffect(() => {
        if (gathno === '') {
            alert("게시글을 찾을 수 없습니다.");
            return;
        }
        const selectArticle = async () => {
            try {
                const response = await gatheringViewApi(gathno);
                setGatheringView(response);
                editorRef.current.getInstance().setMarkdown(response.gathdetail);
            } catch (error) {
                console.log(error);
                alert("해당 글을 찾을 수 없습니다.");
            }
        }
        selectArticle();
    }, [])

    /** 게시글 내용 수정 */
    const handleModify = (e) => {
        const { name, value } = e.target;
        setGatheringView(prevArticle => ({ ...prevArticle, [name]: value, }));
    }
    /** 썸네일 이미지 선택 */
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("파일 올림");
            setThumbnail(file);
            setThumbnailName(file.name);
        }
    }
    /** 게시글 저장 */
    const handleSubmit = async () => {
        // 게시글 내용 꺼내오기
        let contents = editorRef.current.getInstance().getHTML();

        // 게시글 내용 속 이미지 변환 (changeImages 컴포넌트화 시킴)
        const resultData = await changeImages(contents);

        if (resultData !== null) {
            // null 체크 안하면 에러
            resultData.imageList.forEach((image, i) => {
                const imageURL = `${RootUrl()}/uploads/gathering/images/$#@^/${image.name}`;
                contents = contents.replace(resultData.srcPull[i].slice(5, -1), imageURL);
            });
        }

        const formData = new FormData();
        const gatheringData = { ...gatheringView, gathdetail: contents };

        // formData에 gathering 변수의 key:value 값 넣어줌
        Object.keys(gatheringData).forEach(key => {

            if(gatheringData[key] !== null && key !== "recruitList") {
                formData.append(key, gatheringData[key]);
            }
        });

        // 썸네일 이미지 추가
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        // 게시글 이미지 추가
        if (resultData !== null) {
            for (let i = 0; i < resultData.imageList.length; i++) {
                formData.append('images', resultData.imageList[i]);
            }
        }
        console.log("333333");
        console.log([...formData]); // formData 객체의 내용을 확인


        // 서버 전송
        try {
            const response = await gatheringModifyApi(formData);
            if (response > 0) {
                alert("게시글이 수정되었습니다.");
                navigate(`/gathering/view?gathno=${response}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <MainLayout>

            <Breadcrumb crumb={"모임글 / 글수정"} />
            <div className='cntColumn gathCateContent'>
                <div className='cntRow gathCategory'>
                    <div className='cntRow'>
                        <span className='gathCate'>모임 유형</span>
                        <span className='gathCateValue'>
                            {gatheringView.gathcate === 1 ? '프로젝트' :
                                gatheringView.gathcate === 2 ? '스터디' :
                                    gatheringView.gathcate === 3 ? '모임' : '알 수 없음'}
                        </span>
                    </div>
                    <div className='cntRow'>
                        <span className='gathCate'>모임 방식</span>
                        <span className='gathCateValue'>{gatheringView.gathmode}</span>
                    </div>
                </div>
                <div className='cntRow gathCategory'>
                    <div className='cntRow'>
                        <span className='gathCate'>모집 인원</span>
                        <span className='gathCateValue'>{gatheringView.gathnowmember} / {gatheringView.gathtotalmember}</span>
                    </div>
                    <div className='cntRow'>
                        <span className='gathCate'>모집 기간</span>
                        <span className='gathCateValue'>{gatheringView.recruitend} 까지</span>
                    </div>
                </div>
                <div className='cntRow gathCategory'>
                    <div className='cntRow'>
                        <span className='gathCate'>모집 분야</span>
                        <span className='gathCateValue'>{gatheringView.gathrecruitfield}</span>
                    </div>
                    <div className='cntRow'>
                        <span className='gathCate'>진행 기간</span>
                        <span className='gathCateValue'>{gatheringView.projectstart} ~ {gatheringView.projectend}</span>
                    </div>
                </div>
                <div className='cntRow gathCategory'>
                    <div className='cntRow'>
                        <span className='gathCate'>모집 언어</span>
                        <span className='gathCateValue'>{gatheringView.gathlanguage}</span>
                    </div>
                    <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    {thumbnailName || "thumbnail upload"}
                    <HiddenInputFile accept="image/*" onChange={handleThumbnailChange} />
                </Button>
                </div>
            </div>
            <div className='cntRow articleTitle'>
                <input type="text" placeholder='제목' name='gathtitle' value={gatheringView.gathtitle} onChange={(e) => handleModify(e)} />
            </div>

            <div className='cntRow articleWrite'>
                <EditorComponent editorRef={editorRef} />
            </div>
            <div className='cntRow writeBtn'>
                <button onClick={() => navigate(`/gathering/view?gathno=${gathno}`)}>취소</button>
                <button className='blue' onClick={handleSubmit}>수정</button>
            </div>

        </MainLayout>
    )
}

export default ModifyPage