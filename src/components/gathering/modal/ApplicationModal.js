import React from 'react'

const ApplicationModal = ({ handleModal }) => {
  return (
    <div className='dataModalBox' onClick={handleModal}>
        <div className='dateModal'>
            <p>참여 신청</p>

            <h3>닉네임 : 삐뽀삐</h3>
            <h3>활동지역 : 부산</h3>
            <h3>내 언어 : 한국어, 중국어</h3>
            <div>
                <p>한줄소개</p>
                <input type='text'/>
            </div>

            <div>
                <button>신청</button>
                <button>취소</button>
            </div>
        </div>
    </div>
  )
}

export default ApplicationModal