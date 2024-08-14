import { faFloppyDisk, faHeart, faMessage, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPen, faReply, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import PageingComponent from '../common/paging/PageingComponent'
import { RootUrl } from '../../api/RootUrl'
import Moment from 'moment';
import 'moment/locale/ko'; // 한글 번역 파일을 추가
import { gathCommentDeleteApi, gathCommentModifyApi, gathCommentsSelectApi } from '../../api/gatheringApi'

const CommentListComponent = ({ gathno, comState, setComState, loginSlice }) => {
    /** Moment 라이브러리 한글 설정 */
    Moment.locale('ko');

    /** 댓글 페이징 관리 */
    const [comPageable, setComPageable] = useState({pg: 1, gathno: gathno,});

    /** 댓글 목록 저장 */
    const [commentList, setCommentList] = useState([]);

    /** 각 댓글의 수정 상태 관리 */
    const [commentStates, setCommentStates] = useState([]);

    /** 댓글 불러오기 */
    useEffect(()=>{
        const selectComment = async () => {
            try {
                const response = await gathCommentsSelectApi(comPageable);
                if (response === 0) {
                    
                }else {
                    setCommentList(response);
                    setCommentStates(response.dtoList.map(comment => ({
                        id: comment.commentno,
                        content: comment.content,
                        isEditing: false, 
                    })));
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
    /** 댓글 수정 UI 생성 */
    const modifyComment = (e, commentno) => {
        const commentDiv = e.target.closest(`div[id='${commentno}']`);
        const textarea = commentDiv.querySelector('textarea');

        textarea.readOnly = false;
        textarea.style.border = "1px solid #7b7b7b"

        setCommentStates(prevStates =>
            prevStates.map(comment =>
                comment.id === commentno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 댓글 수정 */
    const writeModifyComment = (e, commentno) => {
        setCommentStates(prevStates =>
            prevStates.map(comment =>
                comment.id === commentno ? { ...comment, content: e.target.value } : comment
            )
        );
    }

    /** 댓글 수정 취소 */
    const cancelComment = (e, commentno) => {
        const commentDiv = e.target.closest(`div[id='${commentno}']`);
        const textarea = commentDiv.querySelector('textarea');

        textarea.readOnly = true;
        textarea.style.border = "none";
        textarea.style.borderBottom = "1px solid #7b7b7b";
        textarea.value = commentStates.find(comment => comment.id === commentno).content;

        setCommentStates(prevStates =>
            prevStates.map(comment =>
                comment.id === commentno ? { ...comment, isEditing: !comment.isEditing } : comment
            )
        );
    }

    /** 댓글 수정 저장 */
    const saveComment = async (e, commentno) => {
        const commentDiv = e.target.closest(`div[id='${commentno}']`);
        const textarea = commentDiv.querySelector('textarea');

        if (textarea.value !== "") {
            const data = {
                commentno: commentno,
                content: textarea.value,
            }
            try {
                const response = await gathCommentModifyApi(data);
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
                    comment.id === commentno ? { ...comment, isEditing: !comment.isEditing } : comment
                )
            );
        }else {
            alert("댓글을 입력해주세요.");
        }
    }

    /** 댓글 삭제 */
    const deleteComment = async (e, commentno) => {
        let result = window.confirm("댓글을 삭제하시겠습니까?");

        if (result) {
            try {
                const response = await gathCommentDeleteApi(commentno);
                if (response > 0) {
                    alert("댓글이 삭제되었습니다.");
                    setComState(!comState);
                }
            } catch (error) {
                console.log(error);
            }
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

  return (
    <>
    {commentList.dtoList ? commentList.dtoList.map((comment, index) => (
        <div id={comment.commentno} key={comment.commentno}>
{/******** 댓글 목록 ********/}
            <div>
                {comment.state > 0 ? (
                    <>
                        <img src="../../images/article/deleteUserIcon.svg" alt="profile" />
                        <p>******</p>
                    </>
                ) : (
                    <>
                    <img src={`${RootUrl()}/uploads/user/${comment.userthumb}`} alt="profile" />
                    <p>{comment.usernick}</p>
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
                        <>
                        {(loginSlice.userno === comment.userno) &&
                        <>
                            {commentStates.find(state => state.id === comment.commentno && state.isEditing) ? (
                                <button onClick={(e) => saveComment(e, comment.commentno)}>
                                    <FontAwesomeIcon icon={faFloppyDisk} color='#1e1e1e' size='lg' />
                                    <b>저장</b>
                                </button>
                            ) : (
                                <button onClick={(e) => modifyComment(e, comment.commentno)}>
                                    <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg' />
                                    <b>수정</b>
                                </button>
                            )}
                        </>
                        }

                        {(loginSlice.userno === comment.userno) &&
                        <>
                            {commentStates.find(state => state.id === comment.commentno && state.isEditing) ? (
                                <button onClick={(e) => cancelComment(e, comment.commentno)}>
                                    <FontAwesomeIcon icon={faXmark} color='#1e1e1e' size='lg' />
                                    <b>취소</b>
                                </button>
                            ) : (
                                <button onClick={(e) => deleteComment(e, comment.commentno)}>
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
            <textarea ref={autoResizeTextarea}
                value={commentStates.find(state => state.id === comment.commentno)?.content || ''}
                onChange={(e) => writeModifyComment(e, comment.commentno)}
                readOnly></textarea>

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