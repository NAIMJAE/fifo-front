import { faFloppyDisk, faHeart, faMessage, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faAnglesRight, faPen, faReply, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { commentHeartApi, commentModifyApi, deleteCommentApi, heartCheckApi, selectCommentApi } from '../../api/articleApi'
import PageingComponent from '../../components/common/paging/PageingComponent'
import { RootUrl } from '../../api/RootUrl'
import Moment from 'moment';
import 'moment/locale/ko'; // 한글 번역 파일을 추가

const CommentListComponent = ({ pno, comState, setComState, saveReply, loginSlice }) => {
    /** Moment 라이브러리 한글 설정 */
    Moment.locale('ko');

    /** 댓글 페이징 관리 */
    const [comPageable, setComPageable] = useState({pg: 1, pno: pno,});

    /** 댓글 목록 저장 */
    const [commentList, setCommentList] = useState([]);

    /** 각 댓글의 수정 상태 관리 */
    const [commentStates, setCommentStates] = useState([]);

    /** 각 댓글의 답글 상태 관리 */
    const [replyStates, setReplyStates] = useState([]);

    /** 각 답글의 수정 상태 관리 */
    const [replyModiStates, setReplyModiStates] = useState([]);

    /** 댓글 불러오기 */
    useEffect(()=>{
        const selectComment = async () => {
            try {
                const response = await selectCommentApi(comPageable);
                console.log("댓글 불러오기 response : ", response)
                if (response === 0) {
                    
                }else {
                    setCommentList(response);
                    setCommentStates(response.dtoList.map(comment => ({
                        id: comment.cno,
                        content: comment.content,
                        isEditing: false, 
                    })));
                    setReplyStates(response.dtoList.map(comment => ({
                        id: comment.cno,
                        content: "",
                        isEditing: false, 
                    })));
                    setReplyModiStates(
                        response.dtoList
                            .filter(comment => comment.replyList)
                            .flatMap(comment => comment.replyList)
                            .map(reply => ({
                                id: reply.cno,
                                content: reply.content,
                                isEditing: false,
                            }))
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
        selectComment();
    },[comState, comPageable])

    /** 페이징 처리 */
    const changePage = (newPg) => {
        setComPageable(prev => ({...prev, pg: newPg}));
    }

//**** 댓글 관련 함수들 ****//
    /** 댓글 수정 */
    const modifyComment = (e, cno) => {
        const commentDiv = e.target.closest(`div[id='${cno}']`);
        const textarea = commentDiv.querySelector('textarea');

        textarea.readOnly = false;
        textarea.style.border = "1px solid #7b7b7b"

        setCommentStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 댓글 수정 취소 */
    const cancelComment = (e, cno) => {
        const commentDiv = e.target.closest(`div[id='${cno}']`);
        const textarea = commentDiv.querySelector('textarea');

        textarea.readOnly = true;
        textarea.style.border = "none";
        textarea.style.borderBottom = "1px solid #7b7b7b";
        textarea.value = commentStates.find(comment => comment.id === cno).content;

        setCommentStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 댓글 수정 저장 */
    const saveComment = async (e, cno) => {
        const commentDiv = e.target.closest(`div[id='${cno}']`);
        const textarea = commentDiv.querySelector('textarea');

        const data = {
            cno: cno,
            content: textarea.value,
        }

        try {
            const response = await commentModifyApi(data);
            if (response > 0) {
                alert("댓글이 수정되었습니다.");
            }
        } catch (error) {
            console.log(error);
        }

        textarea.readOnly = true;
        textarea.style.border = "none";
        textarea.style.borderBottom = "1px solid #7b7b7b";

        setCommentStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 댓글 삭제 */
    const deleteComment = async (e, cno) => {
        let result = window.confirm("댓글을 삭제하시겠습니까?");

        if (result) {
            try {
                const response = await deleteCommentApi(cno);
                if (response > 0) {
                    alert("댓글이 삭제되었습니다.")
                    setComState(!comState)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 댓글 좋아요 */
    const heartComment = async (e, cno) => {
        console.log("aa",loginSlice.userno)
        console.log("aa",cno)
        const data = {
            userNo: loginSlice.userno,
            cno: cno,
        }

        try {
            const response = await commentHeartApi(data);
            setComState(!comState)
        } catch (error) {
            console.log(error);
        }

    }

    /** 댓글 수정 시간 계산 */
    const formatRelativeTime = (dateTime) => {
        return Moment(dateTime).fromNow();
    };

    /** textarea 높이 자동 조절 */
    const autoResizeTextarea = useCallback((textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);


//**** 답글 관련 함수들 ****//
    /** 답글 작성 UI 생성 */
    const viewReply = (cno) => {
        setReplyStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 답글 작성 UI 닫기 */
    const cancelReply = (cno) => {
        setReplyStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing, content: "" } : comment
            )
        );
    }

    /** 답글 내용 작성 */
    const writeReply = (e, cno) => {
        setReplyStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, content: e.target.value } : comment
            )
        );
    }

    /** 답글 저장 */
    const completeReply = (cno) => {
        const reply = replyStates.find(state => state.id === cno);
        if (reply) {
            saveReply(cno, reply.content);
            cancelReply(cno); // 답글 저장 후 UI 닫기
        }
    };

    /** 답글 수정 */
    const modifyReply = (e, cno) => {
        const commentDiv = e.target.closest(`div[id='${cno}']`);
        const textarea = commentDiv.querySelector('textarea');

        textarea.readOnly = false;
        textarea.style.border = "1px solid #7b7b7b"

        setReplyModiStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 답글 수정 취소 */
    const cancelModiReply = (e, cno) => {
        const commentDiv = e.target.closest(`div[id='${cno}']`);
        const textarea = commentDiv.querySelector('textarea');

        textarea.readOnly = true;
        textarea.style.border = "none";
        textarea.style.borderBottom = "1px solid #7b7b7b";
        textarea.value = replyModiStates.find(comment => comment.id === cno).content;

        setReplyModiStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 답글 수정 저장 */
    const saveModiReply = async (e, cno) => {
        const commentDiv = e.target.closest(`div[id='${cno}']`);
        const textarea = commentDiv.querySelector('textarea');

        const data = {
            cno: cno,
            content: textarea.value,
        }

        try {
            const response = await commentModifyApi(data);
            if (response > 0) {
                alert("댓글이 수정되었습니다.");
            }
        } catch (error) {
            console.log(error);
        }

        textarea.readOnly = true;
        textarea.style.border = "none";
        textarea.style.borderBottom = "1px solid #7b7b7b";

        setReplyModiStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    // 대댓 디자인 

  return (
    <>
    {commentList.dtoList ? commentList.dtoList.map((comment, index) => (
        <div id={comment.cno} key={comment.cno}>
{/******** 댓글 목록 ********/}
            <div>
                {comment.state > 0 ? (
                    <>
                        <img src="../../images/article/deleteUserIcon.svg" alt="profile" />
                        <p>******</p>
                    </>
                ) : (
                    <>
                    <img src={`${RootUrl()}/uploads/user/${comment.thumb}`} alt="profile" />
                    <p>{comment.nick}</p>
                    </>
                )}
                
                <h3>
                    {Moment(comment.createDate).format('YY.MM.DD HH:mm')}
                    {comment.updateDate && (<span> {formatRelativeTime(comment.updateDate)} 수정</span>)}
                </h3>

                <div>
                    {comment.state > 0 ? (
                        null
                    ) : (
                        <button className='heart' onClick={(e) => heartComment(e, comment.cno)}>
                            <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                            <span>{comment.heart}</span>
                        </button>
                    )}

                    <button onClick={() => viewReply(comment.cno)}>
                        <FontAwesomeIcon icon={faMessage} />
                        <b>답글</b>
                    </button>

                    {comment.state > 0 ? (
                        null
                    ) : (
                        <>
                        {(loginSlice.userno === comment.userNo) &&
                        <>
                            {commentStates.find(state => state.id === comment.cno && state.isEditing) ? (
                                <button onClick={(e) => saveComment(e, comment.cno)}>
                                    <FontAwesomeIcon icon={faFloppyDisk} color='#1e1e1e' size='lg' />
                                    <b>저장</b>
                                </button>
                            ) : (
                                <button onClick={(e) => modifyComment(e, comment.cno)}>
                                    <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg' />
                                    <b>수정</b>
                                </button>
                            )}
                        </>
                        }

                        {(loginSlice.userno === comment.userNo) &&
                        <>
                            {commentStates.find(state => state.id === comment.cno && state.isEditing) ? (
                                <button onClick={(e) => cancelComment(e, comment.cno)}>
                                    <FontAwesomeIcon icon={faXmark} color='#1e1e1e' size='lg' />
                                    <b>취소</b>
                                </button>
                            ) : (
                                <button onClick={(e) => deleteComment(e, comment.cno)}>
                                    <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                                    <b>삭제</b>
                                </button>
                            )}
                        </>
                        }
                        </>
                    )}
                    
                </div>
            </div>
            <textarea ref={autoResizeTextarea} readOnly>{comment.content}</textarea>

{/******** 답글 작성 ********/}
            {replyStates.find(state => state.id === comment.cno && state.isEditing) && 
                <div className='wrtieReplyBox'>
                    <section>
                        <img src={`${RootUrl()}/uploads/user/${loginSlice.thumb}`} alt="profile" />
                        <p>{loginSlice.nick}</p>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faReply} flip="both" size='2xl' color='#7b7b7b'/>
                        <textarea onChange={(e) => writeReply(e, comment.cno)}></textarea>
                    </section>
                    <section>
                        <button onClick={() => completeReply(comment.cno)}>작성</button>
                        <button onClick={() => cancelReply(comment.cno)}>취소</button>
                    </section>
                </div>
            }

{/******** 답글 목록 ********/}
            {comment.replyList && comment.replyList.map((reply, index) => (
                <div className='viewReplyBox'>
                    <div id={reply.cno} key={reply.cno}>
                        <div>
                            <FontAwesomeIcon icon={faReply} flip="both" size='lg' color='#7b7b7b'/>

                            {reply.state > 0 ? (
                                <>
                                    <img src="../../images/article/deleteUserIcon.svg" alt="profile" />
                                    <p>******</p>
                                </>
                            ) : (
                                <>
                                <img src={`${RootUrl()}/uploads/user/${reply.thumb}`} alt="profile" />
                                <p>{reply.nick}</p>
                                </>
                            )}
                            <h3>
                                {Moment(reply.createDate).format('YY.MM.DD HH:mm')}
                                {reply.updateDate && (<span> {formatRelativeTime(reply.updateDate)} 수정</span>)}
                            </h3>
                            <div>
                                {reply.state > 0 ? (
                                    null
                                ) : (
                                    <>
                                        <button className='heart' onClick={(e) => heartComment(e, reply.cno)}>
                                            <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                                            <span>{reply.heart}</span>
                                        </button>

                                        {(loginSlice.userno === reply.userNo) &&
                                        <>
                                            {replyModiStates.find(state => state.id === reply.cno && state.isEditing) ? (
                                                <button onClick={(e) => saveModiReply(e, reply.cno)}>
                                                    <FontAwesomeIcon icon={faFloppyDisk} color='#1e1e1e' size='lg' />
                                                    <b>저장</b>
                                                </button>
                                            ) : (
                                                <button onClick={(e) => modifyReply(e, reply.cno)}>
                                                    <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg' />
                                                    <b>수정</b>
                                                </button>
                                            )}
                                        </>
                                        }

                                        {(loginSlice.userno === reply.userNo) &&
                                        <>
                                            {replyModiStates.find(state => state.id === reply.cno && state.isEditing) ? (
                                                <button onClick={(e) => cancelModiReply(e, reply.cno)}>
                                                    <FontAwesomeIcon icon={faXmark} color='#1e1e1e' size='lg' />
                                                    <b>취소</b>
                                                </button>
                                            ) : (
                                                <button onClick={(e) => deleteComment(e, reply.cno)}>
                                                    <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                                                    <b>삭제</b>
                                                </button>
                                            )}
                                        </>
                                        }
                                    </>
                                )}
                                
                            </div>
                        </div>
                        <textarea ref={autoResizeTextarea} readOnly>{reply.content}</textarea>
                    </div>
                </div>
            ))}

        </div>
    )) : (
        <div>댓글이 없습니다.</div>
    )}
    <div>
        <PageingComponent cntList={commentList} changePage={changePage}/>
    </div>
    </>
  )
}

export default CommentListComponent