import React, { useState } from 'react'

const ApplicationModal = ({ handleAppModal, handleApplication }) => {

    const [intro, setIntro] = useState("");

    const applicationBtn = () => {
        if(!intro) {
            alert("한 줄 소개를 작성해주세요.");
            return;
        }
        let result = window.confirm("신청하시겠습니까?");
        if(result) {
            handleApplication(intro);
            handleAppModal();
        }
    }

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

  return (
    <div className='dataModalBox' onClick={handleAppModal}>
        <div className='dateModal' onClick={bubblingBlock}>
            <p>참여 신청</p>

            <h3>닉네임 : 삐뽀삐</h3>
            <h3>활동지역 : 부산</h3>
            <h3>내 언어 : 한국어, 중국어</h3>
            <div>
                <p>한줄소개</p>
                <input type='text' value={intro} onChange={(e)=>setIntro(e.target.value)}/>
            </div>

            <div>
                <button onClick={applicationBtn}>신청</button>
                <button onClick={handleAppModal}>취소</button>
            </div>
        </div>
    </div>
  )
}

export default ApplicationModal