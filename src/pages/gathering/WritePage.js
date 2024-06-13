import React, { useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { RootUrl } from '../../api/RootUrl';
import { changeImages } from '../../components/common/toast/ImageProcessing';
import EditorComponent from '../../components/common/toast/EditorComponent';
import { gatheringWriteApi } from '../../api/gatheringApi';
import SkillTags from '../../components/gathering/SkillTags';

const Write = () => {

    /** 모임 Data */
    const [gathering, setGathering] = useState({
        gathcate: "",  // 카테고리
        userno: 1,  // 임시 유저 정보
        gathtitle: "",  // 제목
        gathdetail: "",  // 게시글 내용
        gathmode: "",  // 모임 방식
        gathnowmember: 0,  // 모집된 인원 (초기값 0)
        gathtotalmember: "",  // 모집 총 인원
        gathsupport: "",  // 지원 방법
        gathrecruitfield: "",  // 모집 분야
        gathlanguage: "",  // 모집 언어
        recruitstart: "",  // 모집 시작일
        recruitend: "",  // 모집 종료일
        projectstart: "",  // 프로젝트 시작일
        projectend: "",  // 프로젝트 종료일
        gathstate: ""  // 모집 상태
    });

    const [selectedPositions, setSelectedPositions] = useState([]);
    const editorRef = useRef(); // 게시글 내용 저장

    /** 첨부파일 이름 보여주기 */
    const [fileList, setFileList] = useState([]);
    const [fileNameList, setFileNameList] = useState([]);

    const createFile = (event) => {
        const files = event.target.files;
        setFileList(files);
        const fileNames = Array.from(files).map(file => file.name);
        setFileNameList(fileNames);
    }

    /** 게시글 정보 입력 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGathering({
            ...gathering,
            [name]: value
        });
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

        // 게시글 내용 속 이미지 변환 (changeImages 컴포넌트화 시킴)
        const resultData = await changeImages(contents);
        if (resultData !== null) {
            // null 체크 안하면 에러
            resultData.imageList.forEach((image, i) => {
                const imageURL = `${RootUrl()}/uploads/gathering/images/${image.name}`;
                contents = contents.replace(resultData.srcPull[i].slice(5, -1), imageURL);
            });
        }

        const formData = new FormData();
        const gatheringData = { ...gathering, gathdetail: contents };

        // formData에 gathering 변수의 key:value 값 넣어줌
        Object.keys(gatheringData).forEach(key => {
            formData.append(key, gatheringData[key]);
        });

        if (resultData !== null) {
            for (let i = 0; i < resultData.imageList.length; i++) {
                formData.append('images', resultData.imageList[i]);
            }
        }

        // 서버 전송
        try {
            const response = await gatheringWriteApi(formData);
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
                        <button className={gathering.gathcate === '프로젝트' ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathcate: '프로젝트' })}>
                            프로젝트
                            <p>팀원을 모집해 <br />사이트 프로젝트를<br />진행해보세요.</p>
                        </button>
                        <button className={gathering.gathcate === '스터디' ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathcate: '스터디' })}>스터디</button>
                        <button className={gathering.gathcate === '모임' ? 'active' : ''} onClick={() => setGathering({ ...gathering, gathcate: '모임' })}>모임</button>
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
                    <span>모집 기간</span>
                    <div>
                        <input type="date" name="recruitstart" onChange={handleInputChange} />
                        <b>~</b>
                        <input type="date" name="recruitend" onChange={handleInputChange} />
                    </div>
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
                    <span>진행 기간</span>
                    <div>
                        <input type="date" name="projectstart" onChange={handleInputChange} />
                        <b>~</b>
                        <input type="date" name="projectend" onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className='cntRow gatheringData'>
                <SkillTags onChange={handleLanguageChange} />
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
            <div className='cntRow articleFile'>
                <input type="file" multiple onChange={createFile} />
                <div className='selected'>
                    {fileNameList ? fileNameList.map((file, index) => (
                        <span key={index}>{file}</span>
                    )) : (<></>)}
                </div>
            </div>
            <div className='cntRow writeBtn'>
                <button>취소</button>
                <button className='blue' onClick={handleSubmit}>작성</button>
            </div>
        </MainLayout>
    );
}

export default Write;
