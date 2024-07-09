import React, { useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { RootUrl } from '../../api/RootUrl';
import { changeImages } from '../../components/common/toast/ImageProcessing';
import EditorComponent from '../../components/common/toast/EditorComponent';
import { gatheringWriteApi } from '../../api/gatheringApi';
import SkillTags from '../../components/gathering/SkillTags';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HiddenInputFile from '../../components/gathering/HiddenInputFile';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DateModal from '../../components/gathering/modal/DateModal';

const Write = () => {
    const loginSlice = useSelector((state) => state.authSlice) || {};
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);

    /** 모임 Data */
    const [gathering, setGathering] = useState({
        gathcate: 0,  // 카테고리
        userno: loginSlice.userno,
        gathtitle: "",  // 제목
        gathdetail: "",  // 게시글 내용 (content)
        gathmode: "",  // 모임 방식
        gathnowmember: 0,  // 모집된 인원 (초기값 0)
        gathtotalmember: 2,  // 모집 총 인원
        gathsupport: "",  // 지원 방법
        gathrecruitfield: "",  // 모집 분야
        gathlanguage: "",  // 모집 언어
        recruitstart: "",  // 모집 시작일
        recruitend: "",  // 모집 종료일
        projectstart: "",  // 프로젝트 시작일
        projectend: "",  // 프로젝트 종료일
        gathstate: ""  // 모집 상태
    });

    /** 선택한 포지션 문자열 저장 */
    const [selectedPositions, setSelectedPositions] = useState([]);

    /** 썸네일 이미지 저장 */
    const [thumbnail, setThumbnail] = useState(null);

    /** 썸네일 파일 이름 저장 */
    const [thumbnailName, setThumbnailName] = useState("");

    /** 게시글 내용 저장 */
    const editorRef = useRef();

    /** 게시글 정보 입력 - 모집인원일 때 숫자로 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGathering({
            ...gathering,
            [name]: name === 'gathtotalmember' ? parseInt(value) : value
        });
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

    /** 모집 포지션 정보 입력 (,로 구분) */
    const handlePositionSelect = (e) => {
        const position = e.target.value;

        // 이미 선택한 포지션이 아닐 경우만 실행 
        if (!selectedPositions.includes(position)) {
            const newPosition = gathering.gathrecruitfield ? `${gathering.gathrecruitfield}, ${position}` : position;
            setGathering({
                ...gathering,
                gathrecruitfield: newPosition
            });
            setSelectedPositions([...selectedPositions, position]);
        }
    }

    /** 모집 언어 정보 입력 (SkillTags에서 가져옴) */
    const handleLanguageChange = (languages) => {
        setGathering({
            ...gathering,
            gathlanguage: languages
        });
    }

    /** 게시글 작성 */
    const handleSubmit = async () => {
        // 게시글 내용 꺼내오기
        let contents = editorRef.current.getInstance().getHTML();

        const recruitstart = changeDateType(recruit[0].startDate);
        const recruitend = changeDateType(recruit[0].endDate);
        const projectstart = changeDateType(mooim[0].startDate);
        const projectend = changeDateType(mooim[0].endDate);

        setGathering({
            ...gathering,
            recruitstart: recruitstart,
            recruitend: recruitend,
            projectstart: projectstart,
            projectend: projectend
        });

        // 게시글 내용 속 이미지 변환 (changeImages 컴포넌트화 시킴)
        const resultData = await changeImages(contents);
        if (resultData !== null) {
            // null 체크 안하면 에러
            resultData.imageList.forEach((image, i) => {
                const imageURL = `${RootUrl()}/uploads/gathering/images/$#@^/${image.name}`;
                contents = contents.replace(resultData.srcPull[i].slice(5, -1), imageURL);
            });
        }
        // 날짜 정보 입력
        

        const formData = new FormData();
        const gatheringData = { ...gathering, gathdetail: contents };

        // formData에 gathering 변수의 key:value 값 넣어줌
        Object.keys(gatheringData).forEach(key => {
            formData.append(key, gatheringData[key]);
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

        console.log(formData)
        // 서버 전송
        try {
            const response = await gatheringWriteApi(formData);
            // 전송이 완료되면 지정된 경로로 이동
            navigate('/gathering/list');
        } catch (err) {
            console.log(err);
        }
    }
    /** 날짜 */
    const [recruit, setRecruit] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [mooim, setMooim] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    /** 날짜 형태 바꾸기 */
    const changeDateType = (date) => {

        // 년, 월, 일 추출
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const day = String(date.getDate()).padStart(2, '0');

        // "YYYY-MM-DD" 형식으로 조합
        const formatedDate = `${year}-${month}-${day}`;

        return formatedDate;
    }
    /** 모달 창 상태 관리 */

    const handleModal = () => setModalOpen(!modalOpen);
    const handleModal2 = () => setModalOpen2(!modalOpen2);

    const handleDateChange = () => {
        console.log("mooim : ", mooim[0].startDate);
        console.log("recruit : ", recruit[0].endDate);

    }

    return (

        <MainLayout>
            <div className='cntRow gatheringTitle'>
                모임 생성
            </div>
            <button onClick={handleDateChange}>444444444</button>
            <div className='cntRow gatheringCateGroup'>
                <div className='selectGroup'>
                    <span>모임 유형</span>
                    <div className='groupType'>
                        <button className={gathering.gathcate === 1 ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathcate: 1 })}>
                            프로젝트
                            <p>팀원을 모집해 <br />사이트 프로젝트를<br />진행해보세요.</p>
                        </button>
                        <button className={gathering.gathcate === 2 ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathcate: 2 })}>스터디</button>
                        <button className={gathering.gathcate === 3 ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathcate: 3 })}>모임</button>
                    </div>
                </div>
                <div className='selectGroup'>
                    <span>모임 방식</span>
                    <div className='meetingMethod'>
                        <button className={gathering.gathmode === '온/오프라인' ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathmode: '온/오프라인' })}>온/오프라인</button>
                        <button className={gathering.gathmode === '온라인' ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathmode: '온라인' })}>온라인</button>
                        <button className={gathering.gathmode === '오프라인' ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathmode: '오프라인' })}>오프라인</button>
                    </div>
                </div>
            </div>
            <div className='cntRow gatheringData'>
                <div className='cntColumn'>
                    <span>모집 인원</span>
                    <select name="gathtotalmember" onChange={handleInputChange}>
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                        <option value="4">4명</option>
                        <option value="5">5명</option>
                    </select>
                </div>
                <div className='cntColumn'>
                    <button className="hvMdBtn maR10" onClick={handleModal}>모집 기간</button>

                </div>
            </div>
            <div className='cntRow gatheringData'>
                <div className='cntColumn'>
                    <span>모집 포지션</span>
                    <select name="position" onChange={handlePositionSelect}>
                        <option value="백앤드" disabled={selectedPositions.includes('백앤드')}>백앤드</option>
                        <option value="프론트앤드" disabled={selectedPositions.includes('프론트앤드')}>프론트앤드</option>
                        <option value="디자이너" disabled={selectedPositions.includes('디자이너')}>디자이너</option>
                    </select>
                </div>
                <div className='cntColumn'>
                    <button className="hvMdBtn maR10" onClick={handleModal2}>진행 기간</button>

                </div>
            </div>
            <div className='cntRow gatheringData'>
                <div className='cntColumn'>
                    <span>모집 언어</span>
                    <SkillTags onChange={handleLanguageChange} />
                </div>
            </div>
            <div className='cntRow gatheringData'>
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
            <div className='cntRow detail'>
                세부사항
            </div>
            <div className='cntRow articleTitle'>
                <input type="text" placeholder='제목' name="gathtitle" onChange={handleInputChange} />
            </div>
            <div className='cntRow articleWrite'>
                <EditorComponent editorRef={editorRef} />
            </div>

            <div className='cntRow writeBtn'>
                <button>취소</button>
                <button className='blue' onClick={handleSubmit}>작성</button>
            </div>
            {modalOpen && <DateModal date={recruit} setDate={setRecruit} handleModal={handleModal} />}
            {modalOpen2 && <DateModal date={mooim} setDate={setMooim} handleModal={handleModal2} />}
        </MainLayout>
    );
}

export default Write;
