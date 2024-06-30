import { faFloppyDisk, faHeart, faMessage, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faAnglesRight, faPen, faReply, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { commentModifyApi, selectCommentApi } from '../../api/articleApi'
import PageingComponent from '../../components/common/paging/PageingComponent'
import { RootUrl } from '../../api/RootUrl'
import Moment from 'moment';
import 'moment/locale/ko'; // 한글 번역 파일을 추가

const CommentListComponent = ({ pno, comState, saveReply, loginSlice }) => {
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
                }
            } catch (error) {
                console.log(error);
            }
        }
        selectComment();
    },[comState, comPageable])

    const changePage = (newPg) => {
        setComPageable(prev => ({...prev, pg: newPg}));
    }

    /** 댓글 수정 */
    const modifyComment = (e, cno) => {
        const commentDiv = e.target.closest(`div[id='${cno}']`);
        const textarea = commentDiv.querySelector('textarea');

        textarea.readOnly = false;
        textarea.style.border = "1px solid #9f9f9f"

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
        textarea.style.border = "0"

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
            console.log("댓글 수정 response : ", response);
            if (response > 0) {
                alert("댓글이 수정되었습니다.");
            }
        } catch (error) {
            console.log(error);
        }

        textarea.readOnly = true;
        textarea.style.border = "0"

        setCommentStates(prevStates =>
            prevStates.map(comment =>
                comment.id === cno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
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

    // 댓글 삭제, 좋아요, 대댓 디자인 , 대댓 수정 삭제

  return (
    <>
    {commentList.dtoList ? commentList.dtoList.map((comment, index) => (
        <div id={comment.cno} key={comment.cno}>

            {/** 댓글 목록 */}
            <div>
                <img src={`${RootUrl()}/uploads/user/${comment.thumb}`} alt="profile" />
                <p>{comment.nick}</p>
                {(loginSlice.userno === comment.userNo) && <span>내댓글</span>}
                <p>
                    {Moment(comment.createDate).format('YY.MM.DD HH:mm')}
                    {comment.updateDate && (<span> {formatRelativeTime(comment.updateDate)} 수정</span>)}
                </p>
                <div>
                    <button className='heart'>
                        <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                        <span>123</span>
                    </button>

                    <button onClick={() => viewReply(comment.cno)}>
                        <FontAwesomeIcon icon={faMessage} />
                        <b>답글</b>
                    </button>

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
                            <button>
                                <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                                <b>삭제</b>
                            </button>
                        )}
                    </>
                    }
                </div>
            </div>
            <textarea ref={autoResizeTextarea} readOnly>{comment.content}</textarea>

            {/** 답글 작성 */}
            {replyStates.find(state => state.id === comment.cno && state.isEditing) && 
                <div className='wrtieReplyBox'>
                    <section>
                        <FontAwesomeIcon icon={faReply} flip="both" size='2xl'/>
                        <textarea onChange={(e) => writeReply(e, comment.cno)}></textarea>
                    </section>
                    <section>
                        <button onClick={() => completeReply(comment.cno)}>작성</button>
                        <button onClick={() => cancelReply(comment.cno)}>취소</button>
                    </section>
                </div>
            }

            {comment.replyList && comment.replyList.map((reply, index) => (
                <div className='viewReplyBox'>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faReply} flip="both" size='2x' color='#4169e1'/>
                            <img src={`${RootUrl()}/uploads/user/${reply.thumb}`} alt="profile" />
                            <p>{reply.nick}</p>
                            {(loginSlice.userno === reply.userNo) && <span>내댓글</span>}
                            <p>
                                {Moment(reply.createDate).format('YY.MM.DD HH:mm')}
                                {reply.updateDate && (<span> {formatRelativeTime(reply.updateDate)} 수정</span>)}
                            </p>
                            <div>
                                <button className='heart'>
                                    <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                                    <span>123</span>
                                </button>

                                {(loginSlice.userno === reply.userNo) &&
                                <>
                                    {commentStates.find(state => state.id === comment.cno && state.isEditing) ? (
                                        <button onClick={(e) => saveComment(e, reply.cno)}>
                                            <FontAwesomeIcon icon={faFloppyDisk} color='#1e1e1e' size='lg' />
                                            <b>저장</b>
                                        </button>
                                    ) : (
                                        <button onClick={(e) => modifyComment(e, reply.cno)}>
                                            <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg' />
                                            <b>수정</b>
                                        </button>
                                    )}
                                </>
                                }

                                {(loginSlice.userno === reply.userNo) &&
                                <>
                                    {commentStates.find(state => state.id === reply.cno && state.isEditing) ? (
                                        <button onClick={(e) => cancelComment(e, reply.cno)}>
                                            <FontAwesomeIcon icon={faXmark} color='#1e1e1e' size='lg' />
                                            <b>취소</b>
                                        </button>
                                    ) : (
                                        <button>
                                            <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                                            <b>삭제</b>
                                        </button>
                                    )}
                                </>
                                }
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