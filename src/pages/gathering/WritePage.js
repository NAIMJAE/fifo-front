import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { RootUrl } from '../../api/RootUrl';
import { changeImages } from '../../components/common/toast/ImageProcessing';
import EditorComponent from '../../components/common/toast/EditorComponent';
import { gatheringWriteApi } from '../../api/gatheringApi';
import SkillTags from '../../components/gathering/SkillTags';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HiddenInputFile from '../../components/gathering/HiddenInputFile';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DateModal from '../../components/gathering/modal/DateModal';

// 날짜 유틸리티 함수
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const Write = () => {
    const loginSlice = useSelector((state) => state.authSlice) || {};
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // 스크롤을 맨 위로 이동
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    /** 모임 Data */
    const [gathering, setGathering] = useState({
        gathcate: 0,  // 카테고리
        userno: loginSlice.userno,
        gathtitle: "",  // 제목
        gathdetail: "",  // 게시글 내용 (content)
        gathmode: "",  // 모임 방식
        gathnowmember: 1,  // 모집된 인원 (초기값 1)
        gathtotalmember: 2,  // 모집 총 인원
        gathrecruitfield: "",  // 모집 분야
        gathlanguage: "",  // 모집 언어
        recruitstart: "",  // 모집 시작일
        recruitend: "",  // 모집 종료일
        mooimperiod: "2주",  // 모임 기간
        gathstate: "1"  // 모집 상태
    });
    /** positions 배열 생성 */
    const positions = [
        '백앤드',
        '프론트앤드',
        '디자이너',
    ];
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
    const handlePositionSelect = (event, newValue) => {
        // 선택된 포지션 상태를 업데이트
        setSelectedPositions(newValue);

        // 새로 선택된 포지션들을 ,로 구분하여 gathrecruitfield 업데이트
        const newPosition = newValue.join(', ');
        setGathering({
            ...gathering,
            gathrecruitfield: newPosition
        });
    };

    /** 모집 언어 정보 입력 (SkillTags에서 가져옴) */
    const handleLanguageChange = (languages) => {
        setGathering({
            ...gathering,
            gathlanguage: languages
        });
    }

    /** 게시글 작성 */
    const handleSubmit = async () => {
        let contents = editorRef.current.getInstance().getHTML();

        // 필수 입력 필드 검사
        const requiredFields = [
            { field: 'gathtitle', name: '제목' },
            { field: 'gathmode', name: '모임 방식' },
            { field: 'gathrecruitfield', name: '모집 분야' },
            { field: 'gathlanguage', name: '모집 언어' },
            { field: 'recruitstart', name: '모집 시작일' },
            { field: 'recruitend', name: '모집 종료일' },
            { field: 'mooimperiod', name: '모임 기간' }
        ];

        for (let { field, name } of requiredFields) {
            if (!gathering[field]) {
                alert(`${name} 필드를 입력해 주세요.`);
                return;
            }
        }

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

    /** 날짜 초기화 */
    const initializeRecruit = () => {
        const startDate = new Date();
        const endDate = addDays(startDate, 7); // startDate의 1주일 후
        return [{ startDate, endDate, key: 'selection' }];
    };

    const [recruit, setRecruit] = useState(initializeRecruit);

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
    const handleModal = () => {
        setModalOpen(!modalOpen);
        if (modalOpen) {
            // 날짜 정보 입력
            const recruitstart = changeDateType(recruit[0].startDate);
            const recruitend = changeDateType(recruit[0].endDate);
            setGathering({
                ...gathering,
                recruitstart: recruitstart,
                recruitend: recruitend,
            });
        }
    };

    return (
        <MainLayout>
            <div className='cntRow gatheringTitle'>
                모임 생성
            </div>
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
                    <span>모집 포지션</span>
                    <Stack spacing={3} sx={{ width: 500 }}>
                        <Autocomplete
                            multiple
                            id="positions-outlined"
                            options={positions.filter(position => !selectedPositions.includes(position))} // 이미 선택한 포지션은 자동완성에서 없앰
                            getOptionLabel={(option) => option}
                            value={selectedPositions}
                            onChange={handlePositionSelect}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="모집 포지션"
                                    placeholder="원하는 포지션을 선택하세요."
                                />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={option}
                                        {...getTagProps({ index })}
                                        sx={{ backgroundColor: '#007bff', color: 'white' }} // 포지션 선택에 따른 스타일 지정
                                    />
                                ))
                            }
                        />
                    </Stack>
                </div>
            </div>
            <div className='cntRow gatheringData'>
                <div className='cntColumn'>
                    <span>모집 언어</span>
                    <SkillTags onChange={handleLanguageChange} />
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
            <div className='cntRow gatheringData'>
                <div className='cntRow cntSelectDate'>
                    <button className="hvMdBtn maR10" onClick={handleModal}>모집 기간</button>
                    <p>{gathering.recruitstart} ~ {gathering.recruitend}</p>
                </div>

                <div className='cntRow'>
                    <span>모임 기간</span>
                    <select name="mooimperiod" onChange={handleInputChange}>
                        <option value="2주">2주</option>
                        <option value="1개월">1개월</option>
                        <option value="2개월">2개월</option>
                        <option value="3개월 이상">3개월 이상</option>
                    </select>
                </div>
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
        </MainLayout>
    );
}

export default Write;
