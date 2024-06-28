import React, { useState } from 'react'

const CommentWriteComponent = ({ commentNum, insertComment, loginSlice }) => {

  const [comment, setComment] = useState({
    content: "",
    userNo: "",
    userName: "",
    pno: "",
  });

  /** 댓글 입력 textarea 관리 */
  const handleChange = (e) => {
    setComment(prev => ({...prev, content: e.target.value}));
  };

  /** 댓글 작성 버튼 */
  const handleSubmit = () => {
    if (comment.content.trim() !== "") {
      let result = window.confirm("댓글을 작성하시겠습니까?");
      if (result ) {
        insertComment(comment);
        setComment({ content: "" });
      }
    }else {
      alert("댓글을 입력해주세요.");
    }
  };

  return (
    <>
        <p>댓글 {commentNum} 개</p>
        <div>
            <img src="../../images/ppoppi.png" alt="profile" />
            <p>우리집뽀삐</p>
        </div>
        <div>
            <textarea value={comment.content} onChange={handleChange}></textarea>
            <button onClick={handleSubmit}>작성</button>
        </div>
    </>
  )
}

export default CommentWriteComponent