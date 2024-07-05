import React from 'react'

const RecruitModal = ({handleModal}) => {
  return (
    <div className='recruitModalBox' onClick={handleModal}>
        <div className='recruitModal'>
            <div className='cntRow' style={{justifyContent:"space-between"}}>
                <p>김선광</p>
                <h3>수락대기</h3>
            </div>
        </div>
        <div className='recruitInfoModal'>
            <div className='cntRow' style={{justifyContent:"space-between"}}>
                <p>김선광</p>
                <h3>수락대기</h3>
            </div>
        </div>
    </div>
  )
}

export default RecruitModal