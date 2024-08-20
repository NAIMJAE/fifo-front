import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/article.scss'
import {Viewer} from '@toast-ui/react-editor';
import Breadcrumb from '../../components/common/main/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import CommentListComponent from '../../components/article/CommentListComponent';
import CommentWriteComponent from '../../components/article/CommentWriteComponent';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { articleViewApi, commentInsertApi, deletePostApi, increaseHeartApi, postFileDownloadApi, replyInsertApi } from '../../api/articleApi';
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
    const navigate = useNavigate();

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
            try {
                const response = await articleViewApi(pno); 
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

    /** 게시글 수정 */
    const modifyPost = () => {
        let result = window.confirm("게시글을 수정하시겠습니까?");
        if (result) {
            navigate(`/article/modify?pno=${pno}`)
        }
    }

    /** 게시글 좋아요 */
    const increaseHeart = async () => {
        const data = {
            userNo: 1,
            pno: articleView.pno,
        }
        try {
            const response = await increaseHeartApi(data);
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

        try {
            const response = await commentInsertApi(comment);
            if (response > 0) {
                setComState(!comState);
                alert("댓글이 작성되었습니다.");
                setComNum(comNum + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /** 답글 작성 */
    const saveReply = async (cno, content) => {
        const data = {
            content: content,
            userNo: loginSlice.userno,
            pno: articleView.pno,
            parentCno: cno,
        }
        try {
            const response = await replyInsertApi(data);
            if (response > 0) {
                setComState(!comState);
                alert("답글이 작성되었습니다.");
                setComNum(comNum + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /** 게시글 삭제 */
    const deletePost = async (pno) => {

        let result = window.confirm("게시글을 삭제하시겠습니까?");
        if (result) {
            try {
                const response = await deletePostApi(pno);
                if (response > 0) {
                    alert("게시글이 삭제되었습니다.");
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 첨부파일 다운로드 */
    const downloadFile = async (e) => {

        if (loginSlice.userno === undefined) {
            alert("로그인 후 다운로드 가능합니다.");
            return;
        }

        const fno = e.target.id;
        try {
            const response = await postFileDownloadApi(fno);

            // filename 부분을 추출하여 파일 이름으로 사용
            const contentDisposition = response.headers["content-disposition"];
            let fileName = 'downloaded-file';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename\*?=['"]?([^;]+)['"]?/);
                if (fileNameMatch != null && fileNameMatch.length > 1) {
                    fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''));
                }
            }

            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.log(error)
        }
    }


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
                <>
                {Object.keys(file).map((key) => (
                    <span key={key} id={key} onClick={(e) => downloadFile(e)}>{file[key]}</span>
                ))}
                </>
            ))}
        </div>

        <div className='cntColumn articleTag'>
            <div className='cntWrapRow' style={{marginTop:"0"}}>
                {articleView.tagName ? articleView.tagName.map((tag, index) => (
                    <span key={index} className='tag'>{tag}</span>
                )) : (<></>)}
            </div>
        </div>
        
        {loginSlice.userno === articleView.userNo && 
            <div className='cntRow viewModify'>
                <button onClick={() => modifyPost(articleView.pno)}>
                    <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg'/>
                    수정
                </button>
                <button onClick={() => deletePost(articleView.pno)}>
                    <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                    삭제
                </button>
            </div>
        }
        

        <div className='cntColumn writeComment'>
            {loginSlice.userno !== undefined ? (
                <>
                {articleView.pno > 0 && <CommentWriteComponent comNum={comNum} insertComment={insertComment} loginSlice={loginSlice}/>}
                </>
            ) : (
                <p>댓글을 작성하시려면 로그인이 필요합니다.</p>
            )}
        </div>

        <div className='cntColumn viewComment'>
            {articleView.pno > 0 && <CommentListComponent pno={articleView.pno} comState={comState} setComState={setComState} saveReply={saveReply} loginSlice={loginSlice}/>}
        </div>

    </MainLayout>
  )
}

export default ViewPage