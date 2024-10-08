import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/gathering.scss'
import { Viewer } from '@toast-ui/react-editor';
import Breadcrumb from '../../components/common/main/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import GathCommentListComponent from '../../components/gathering/GathCommentListComponent';
import CommentWriteComponent from '../../components/article/CommentWriteComponent';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { FrontUrl, RootUrl } from '../../api/RootUrl';
import Moment from 'moment';
import { useSelector } from 'react-redux';
import { gathCommentInsertApi, gatheringDeleteApi, gatheringViewApi, recruitApi } from '../../api/gatheringApi';
import { Alert } from '@mui/material';
import RecruitModal from '../../components/gathering/modal/RecruitModal';
import ApplicationModal from '../../components/gathering/modal/ApplicationModal';
import GathStartModal from '../../components/gathering/modal/GathStartModal';

const ViewPage = () => {

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let gathno = queryParams.get('gathno');
    const shareURL = FrontUrl() + location.pathname + location.search

    const loginSlice = useSelector((state) => state.authSlice) || {};
    /** useEffect 재랜더릴용 useState */
    const [lender, setLender] = useState(false);
    /** 게시글 useState */
    const [gatheringView, setGatheringView] = useState({});
    /** 참여현황 useState */
    const [recruitList, setRecruitList] = useState([]);
    /** 해당 사용자 참여 신청 여부 */
    const [recruitTF, setRecruitTF] = useState(false);
    /** 해당 사용자 참여 신청 상태 */
    const [recruitText, setRecruitText] = useState("");
    /** 댓글 상태 관리 useState */
    const [comState, setComState] = useState(false);
    /** 댓글 개수 관리 */
    const [comNum, setComNum] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (gathno === '') {
            alert("게시글을 찾을 수 없습니다.");

            return;
        }
        const selectArticle = async () => {
            console.log("gathno", gathno)
            try {
                const response = await gatheringViewApi(gathno);
                console.log("response : ", response)
                setGatheringView(response);
                setComNum(response.gathcomment);

                // 현재 로그인한 사용자가 해당 모임에 신청 했는지 안했는지 확인
                setRecruitList(response.recruitList);
                if (loginSlice.userno !== undefined) {
                    const isUserInRecruitList = response.recruitList.some(recruit => {
                        if (recruit.userno == loginSlice.userno) {
                            setRecruitTF(true);
                            setRecruitText(recruit.recruitstate);
                            return true; // 조건을 만족하면 true 반환
                        }
                        return false; // 조건을 만족하지 않으면 false 반환
                    });
                }
            } catch (error) {
                console.log(error);
                alert("해당 글을 찾을 수 없습니다.");
            }
        }
        selectArticle();
    }, [lender]);

    /** 게시글 링크 복사하기 */
    const copyUrl = () => {
        navigator.clipboard.writeText(shareURL);
    }

    /** 게시글 수정 */
    const modifyGathering = (gathno) => {
        let result = window.confirm("게시글을 수정하시겠습니까?");
        if (result) {
            navigate(`/gathering/modify?gathno=${gathno}`)
        }
    }

    /** 게시글 삭제 */
    const deleteGathering = async (gathno) => {
        let result = window.confirm("게시글을 삭제하시겠습니까?");
        if (result) {
            try {
                const response = await gatheringDeleteApi(gathno);
                if (response > 0) {
                    alert("게시글이 삭제되었습니다.");
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 댓글 작성 */
    const insertComment = async (comment) => {

        const gathComment = {
            content: comment.content,
            userno: loginSlice.userno,
            gathno: gatheringView.gathno,
        };
        try {
            const response = await gathCommentInsertApi(gathComment);
            if (response > 0) {
                setComState(!comState);
                alert("댓글이 작성되었습니다.");
                setComNum(comNum + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /** 참가 신청 현황 모달 관리 */
    const [recruitState, setRecruitState] = useState(false);
    const handleModal = () => setRecruitState(!recruitState);


    /** 참가 신청 모달 관리 */
    const [appState, setAppState] = useState(false);
    const handleAppModal = () => setAppState(!appState);

    /** 참여 신청 버튼 */
    const handleApplication = async (input) => {
        const data = {
            userno: loginSlice.userno,
            gathno: gatheringView.gathno,
            intro: input,
        }
        console.log("data : ", data);

        try {
            const response = await recruitApi(data);
            if (response > 0) {
                alert("참여 신청되었습니다.");
                setRecruitTF(true);
                setLender(!lender);
            } else {
                alert("참여 신청 실패")
            }
        } catch (error) {
            console.log(error);
        }
    }

    /** 참여 신청 취소 버튼 */
    const cancelRecruit = async () => {
        let result = window.confirm("참여 신청을 취소하시겠습니까?");
        if (result) {
            const data = {
                userno: loginSlice.userno,
                gathno: gatheringView.gathno,
            }
            try {
                const response = await recruitApi(data);
                if (response < 1) {
                    alert("참여 신청이 취소되었습니다.");
                    setRecruitTF(false);
                    setLender(!lender);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 모임 시작하기 */
    const [gathStart, setGathStart] = useState(false);
    const handleStartModal = () => setGathStart(!gathStart);
    const modalData = {
        gathno : gatheringView.gathno,
        gathcate : gatheringView.gathcate,
        gathmode : gatheringView.gathmode,
    }

    return (
        <MainLayout>

            <Breadcrumb crumb={"모임 / 글보기"} />

            <div className='cntColumn viewTitle'>
                <div>
                    <span>모임글 No.{gathno} | {Moment(gatheringView.recruitstart).format('YY.MM.DD')}</span>
                    <div className='dateBox'>
                        <h4>{shareURL}</h4>
                        <button onClick={copyUrl}>공유하기</button>
                    </div>
                </div>
                <div>
                    <h1>{gatheringView.gathtitle}</h1>
                    <div className='dateBox'>
                        <h2>조회수 : {gatheringView.hit}</h2>
                    </div>
                </div>
                <div>
                    <img src={`${RootUrl()}/uploads/user/${gatheringView.userthumb}`} alt="profile" />
                    <p>{gatheringView.usernick}</p>
                    <div className='hitBox'>
                        <span>
                            <h2>신고</h2>
                        </span>
                    </div>
                </div>
            </div>
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
                        <span className='gathCate'>예상 기간</span>
                        <span className='gathCateValue'>{gatheringView.mooimperiod}</span>
                    </div>
                </div>
                <div className='cntRow gathCategory'>
                    <div className='cntRow'>
                        <span className='gathCate'>모집 언어</span>
                        <span className='gathCateValue'>{gatheringView.gathlanguage}</span>
                    </div>
                    {gatheringView.userno === loginSlice.userno ? (
                        <div className='cntRow gathRecruit'>
                            <span className='gathCate'>지원 현황</span>
                            <span className='gathCateValue'>{recruitList.length}명 <span onClick={handleModal}>상세 <FontAwesomeIcon icon={faSquareCaretDown} size='lg' color='#4169e1' /></span></span>
                        </div>
                    ) : (
                        <div className='cntRow'>
                            {gatheringView.gathstate === "모집종료" ? (
                                <span>모집 종료된 게시글입니다.</span>
                            ) : (
                                <>
                                {loginSlice.userno !== undefined &&
                                <>
                                    {!recruitTF && <button className="hvMdBtn maR10" onClick={() => setAppState(true)}>참여신청</button>}
                                    
                                    {recruitTF && 
                                    <>
                                        {recruitText === "수락 대기" && 
                                            <>
                                                <p>{recruitText} 중 입니다.</p>
                                                <button className="hvMdBtn maR10" onClick={cancelRecruit}>신청취소</button>
                                            </>
                                        }
                                        {recruitText === "신청 거절" && <p>{recruitText}되었습니다.</p>}
                                        {recruitText === "신청 수락" && <p>{recruitText}되었습니다.</p>}
                                    </>
                                    }
                                </>
                                }
                                {loginSlice.userno === undefined &&
                                    <span>로그인 하시면 참가 신청 가능</span>
                                }
                                </>
                            )}
                        </div>
                    )}
                </div>

                {loginSlice.userno === gatheringView.userno && gatheringView.gathnowmember === gatheringView.gathtotalmember &&
                <div className='gathStart'>
                    <button onClick={handleStartModal}><FontAwesomeIcon icon={faPlus} size='1x'/>모임 시작하기</button>
                </div>
                }

                <div className='alertBox'>
                    <Alert className='alert' severity="info">참여를 신청하면, 내 언어 레벨과 매너 스택 등의 정보가 모임 호스트에게 전달됩니다.</Alert>
                </div>
            </div>
            <div className='cntRow viewContents'>
                {gatheringView.gathdetail ? <Viewer initialValue={gatheringView.gathdetail} /> : <p>Loading...</p>}
            </div>

            {loginSlice.userno === gatheringView.userno &&
                <div className='cntRow viewModify'>
                    <button onClick={() => modifyGathering(gatheringView.gathno)}>
                        <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg' />
                        수정
                    </button>
                    <button onClick={() => deleteGathering(gatheringView.gathno)}>
                        <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg' />
                        삭제
                    </button>
                </div >
            }

            <div className='cntColumn writeComment'>
                {loginSlice.userno !== undefined ? (
                    <>
                        {gatheringView.gathno > 0 && <CommentWriteComponent comNum={comNum} insertComment={insertComment} loginSlice={loginSlice} />}
                    </>
                ) : (
                    <p>댓글을 작성하시려면 로그인이 필요합니다.</p>
                )}
            </div>
            <div className='cntColumn viewComment'>
                {gatheringView.gathno > 0 && <GathCommentListComponent gathno={gatheringView.gathno} comState={comState} setComState={setComState} loginSlice={loginSlice} />}
            </div>

            {/** 모임 참가 신청 현황 모달 */}
            {recruitState && <RecruitModal recruitList={recruitList} handleModal={handleModal} lender={lender} setLender={setLender} />}

            {/** 모임 참가 신청 모달 */ }
            { appState && <ApplicationModal handleAppModal={handleAppModal} handleApplication={handleApplication} /> }

            {/** 모임 시작 모달 */ }
            { gathStart && <GathStartModal modalData={modalData} handleStartModal={handleStartModal}/>}
        </MainLayout >
    )
}

export default ViewPage