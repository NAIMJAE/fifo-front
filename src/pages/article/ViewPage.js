import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/article.scss'
import {Viewer} from '@toast-ui/react-editor';
import Breadcrumb from '../../components/common/main/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEye, faHeart, faThumbsUp, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import CommentListComponent from '../../components/article/CommentListComponent';
import CommentWriteComponent from '../../components/article/CommentWriteComponent';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { articleViewApi, commentInsertApi, increaseHeartApi } from '../../api/articleApi';
import { FrontUrl, RootUrl } from '../../api/RootUrl';
import Moment from 'moment';
import { useSelector } from 'react-redux';

const ViewPage = () => {

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let pno = queryParams.get('pno');
    const shareURL = FrontUrl() + location.pathname + location.search

    const loginSlice = useSelector((state) => state.authSlice) || {};

    /** 게시글 useState */
    const [articleView, setArticleView] = useState({});
    /** 댓글 상태 관리 useState */
    const [comState, setComState] = useState(false);
    /** 댓글 개수 관리 */
    const [comNum, setComNum] = useState("");

    useEffect (() => {
        if (pno === '') {
            alert("게시글을 찾을 수 없습니다.");
            
            return;
        }
        const selectArticle = async () => {
            console.log("pno",pno)
            try {
                const response = await articleViewApi(pno); 
                console.log("response : ", response)
                setArticleView(response);
                setComNum(response.comNum);
            } catch (error) {
                console.log(error);
                alert("게시글을 찾을 수 없습니다.");
            }
        }
        selectArticle();
    }, []);

    /** 게시글 링크 복사하기 */
    const copyUrl = () => {
        navigator.clipboard.writeText(shareURL);
    }



    /** 게시글 좋아요 */
    const increaseHeart = async () => {
        const data = {
            userNo: 1,
            pno: articleView.pno,
        }
        try {
            const response = await increaseHeartApi(data);
            console.log("좋아요 response : ", response);
            setArticleView(prevState => ({
                ...prevState,
                heartNum: response > 0 ? prevState.heartNum + 1 : prevState.heartNum - 1
            }));
        } catch (error) {
            console.log(error)
        }
    }

    /** 댓글 작성 */
    const insertComment = async (comment) => {
        comment.pno = articleView.pno;
        console.log("comment : ", comment);

        try {
            const response = await commentInsertApi(comment);
            if (response > 0) {
                setComState(!comState);
                alert("댓글이 작성되었습니다.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 게시글 조회수 카운팅, 게시글 수정, 삭제, 첨부파일 다운로드 남음

  return (
    <MainLayout>

        <Breadcrumb crumb={"게시판 / 글보기"}/>

        <div className='cntColumn viewTitle'>
            <div>
                <span>{articleView.cateName} - 게시글 No.{pno} | {Moment(articleView.createDate).format('YY.MM.DD HH:mm:ss')}</span>
                <div className='dateBox'>
                    <h4>{shareURL}</h4>
                    <button onClick={copyUrl}>공유하기</button>
                </div>
            </div>
            <div>
                <h1>{articleView.title}</h1>
                <div className='dateBox'>
                    <h2>조회수 : {articleView.hit}</h2>
                </div>
            </div>
            <div>
                <img src={`${RootUrl()}/uploads/user/${articleView.thumb}`} alt="profile" />
                <p>{articleView.nick}</p>
                <div className='hitBox'>
                    <span onClick={increaseHeart}>
                        <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                        <h3>{articleView.heartNum}</h3>
                    </span>
                    <span>
                        <h2>신고</h2>
                    </span>
                </div>
            </div>
        </div>

        <div className='cntRow viewContents'>
            {articleView.content ? <Viewer initialValue={articleView.content} /> : <p>Loading...</p>}
        </div>

        <div className='cntWrapRow viewFile'>
            <p>첨부파일</p>
            {articleView.fileName && articleView.fileName.map((file, index) => (
                <span key={index}>{file}</span>
            ))}
        </div>

        <div className='cntColumn articleTag'>
            <div className='cntWrapRow' style={{marginTop:"0"}}>
                {articleView.tagName ? articleView.tagName.map((tag, index) => (
                    <span key={index} className='tag'>{tag}</span>
                )) : (<></>)}
            </div>
        </div>
        

        <div className='cntRow viewModify'>
            <button>
                <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg'/>
                수정
            </button>
            <button>
                <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                삭제
            </button>
        </div>

        <div className='cntColumn writeComment'>
            {articleView.pno > 0 && <CommentWriteComponent comNum={comNum} insertComment={insertComment} loginSlice={loginSlice}/>}
        </div>

        <div className='cntColumn viewComment'>
            {articleView.pno > 0 && <CommentListComponent pno={articleView.pno} comState={comState} loginSlice={loginSlice}/>}
        </div>

    </MainLayout>
  )
}

export default ViewPage