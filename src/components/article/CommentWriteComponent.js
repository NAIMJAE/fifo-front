import React, { useEffect, useRef, useState } from 'react'
import { RootUrl } from '../../api/RootUrl';

const CommentWriteComponent = ({ comNum, insertComment, loginSlice }) => {

  /** 작성할 댓글 정보 저장 */
  const [comment, setComment] = useState({
    content: "",
    userNo: loginSlice.userno, 
    pno: 0,
  });

  /** 댓글 입력 textarea 관리 */
  const handleChange = (e) => {
    setComment(prev => ({ ...prev, content: e.target.value }));
  };

  /** 댓글 작성 버튼 */
  const handleSubmit = () => {
    if (comment.content.trim() !== "" && comment.content.length < 1000) {
      let result = window.confirm("댓글을 작성하시겠습니까?");
      if (result) {
        insertComment(comment);
        setComment({ ...comment, content: "" });
      }
    } else if (comment.content.length > 1000) {
      alert("댓글은 최대 1000자까지 작성가능합니다.");
    } else {
      alert("댓글을 입력해주세요.");
    }
  };


  return (
    <>
        <p>댓글 {comNum} 개</p>
        <div>
            <img src={`${RootUrl()}/uploads/user/${loginSlice.thumb}`} alt="profile" />
            <p>{loginSlice.nick}</p>
        </div>
        <div>
            <textarea value={comment.content} onChange={handleChange}></textarea>
            <button onClick={handleSubmit}>작성</button>
        </div>
    </>
  )
}

export default CommentWriteComponent