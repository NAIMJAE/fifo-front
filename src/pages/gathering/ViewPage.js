import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/article.scss'
import { Viewer } from '@toast-ui/react-editor';
import Breadcrumb from '../../components/common/main/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEye, faHeart, faThumbsUp, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import CommentListComponent from '../../components/article/CommentListComponent';
import CommentWriteComponent from '../../components/article/CommentWriteComponent';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { FrontUrl, RootUrl } from '../../api/RootUrl';
import Moment from 'moment';
import { useSelector } from 'react-redux';
import { gathCommentInsertApi, gatheringViewApi } from '../../api/gatheringApi';

const ViewPage = () => {

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let gathno = queryParams.get('gathno');
    const shareURL = FrontUrl() + location.pathname + location.search

    const loginSlice = useSelector((state) => state.authSlice) || {};

    /** 게시글 useState */
    const [gatheringView, setGatheringView] = useState({});
    /** 댓글 상태 관리 useState */
    const [comState, setComState] = useState(false);
    /** 댓글 개수 관리 */
    const [comNum, setComNum] = useState("");

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
                setComNum(response.comNum);
            } catch (error) {
                console.log(error);
                alert("해당 글을 찾을 수 없습니다.");
            }
        }
        selectArticle();
    }, []);

    /** 게시글 링크 복사하기 */
    const copyUrl = () => {
        navigator.clipboard.writeText(shareURL);
    }
    /** 댓글 작성 */
    const insertComment = async (comment) => {
        comment.gathno = gatheringView.gathno;
        console.log("comment : ", comment);

        try {
            const response = await gathCommentInsertApi(comment);
            if (response > 0) {
                setComState(!comState);
                alert("댓글이 작성되었습니다.");
            }
        } catch (error) {
            console.log(error);
        }
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
                    <h1>{gatheringView.title}</h1>
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

            <div className='cntRow viewContents'>
                {gatheringView.gathdetail ? <Viewer initialValue={gatheringView.gathdetail} /> : <p>Loading...</p>}
            </div>

            <div className='cntRow viewModify'>
                <button>
                    <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg' />
                    수정
                </button>
                <button>
                    <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg' />
                    삭제
                </button>
            </div>

            <div className='cntColumn writeComment'>
                {gatheringView.gathno > 0 && <CommentWriteComponent comNum={comNum} insertComment={insertComment} loginSlice={loginSlice} />}
            </div>

            <div className='cntColumn viewComment'>
                {gatheringView.gathno > 0 && <CommentListComponent gathno={gatheringView.gathno} comState={comState} />}
            </div>

        </MainLayout>
    )
}

export default ViewPage