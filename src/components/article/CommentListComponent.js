import { faFloppyDisk, faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { commentModifyApi, selectCommentApi } from '../../api/articleApi'
import PageingComponent from '../../components/common/paging/PageingComponent'
import { RootUrl } from '../../api/RootUrl'
import Moment from 'moment';
import 'moment/locale/ko'; // 한글 번역 파일을 추가

const CommentListComponent = ({ pno, comState, loginSlice }) => {

    Moment.locale('ko');

    /** 댓글 목록 저장 */
    const [commentList, setCommentList] = useState([]);

    /** 각 댓글의 수정 상태 관리 */
    const [commentStates, setCommentStates] = useState([]);

    /** 댓글 불러오기 */
    useEffect(()=>{
        const selectComment = async () => {
            try {
                const response = await selectCommentApi(pno);
                console.log("댓글 불러오기 response : ", response)
                if (response === 0) {
                    
                }else {
                    setCommentList(response);
                    setCommentStates(response.map(comment => ({
                        id: comment.cno,
                        content: comment.content,
                        isEditing: false, 
                    })));
                }
            } catch (error) {
                console.log(error);
            }
        }
        selectComment();
    },[comState])

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

    // 댓글 삭제, 좋아요, 페이징 구현 남음 + 댓글 작성시 userno값 넣기도

  return (
    <>
    {commentList.length > 0 ? commentList.map((comment, index) => (
        <div id={comment.cno} key={comment.cno}>
            <div>
                <img src={`${RootUrl()}/uploads/user/${comment.thumb}`} alt="profile" />
                <p>{comment.nick}</p>
                <p>
                    {Moment(comment.createDate).format('YY.MM.DD HH:mm')}
                    {comment.updateDate && (<span> {formatRelativeTime(comment.updateDate)} 수정</span>)}
                </p>
                <div>
                    <button className='heart'>
                        <FontAwesomeIcon icon={faHeart} color='#FF0000' size='lg'/>
                        <span>123</span>
                    </button>

                    {(loginSlice.userno === comment.userNo) &&
                    <>
                        {commentStates.find(state => state.id === comment.cno && state.isEditing) ? (
                            <button onClick={(e) => saveComment(e, comment.cno)}>
                                <FontAwesomeIcon icon={faFloppyDisk} color='#1e1e1e' size='lg' />
                            </button>
                        ) : (
                            <button onClick={(e) => modifyComment(e, comment.cno)}>
                                <FontAwesomeIcon icon={faPen} color='#1e1e1e' size='lg' />
                            </button>
                        )}
                    </>
                    }

                    {(loginSlice.userno === comment.userNo) &&
                    <>
                        {commentStates.find(state => state.id === comment.cno && state.isEditing) ? (
                            <button onClick={(e) => cancelComment(e, comment.cno)}>
                                <FontAwesomeIcon icon={faXmark} color='#1e1e1e' size='lg' />
                            </button>
                        ) : (
                            <button>
                                <FontAwesomeIcon icon={faTrashCan} color='#1e1e1e' size='lg'/>
                            </button>
                        )}
                    </>
                    }
                    
                </div>
            </div>
            <textarea ref={autoResizeTextarea} readOnly>{comment.content}</textarea>
        </div>
    )) : (
        <div>댓글이 없습니다.</div>
    )}
    <div>
        <PageingComponent/>
    </div>
    </>
  )
}

export default CommentListComponent