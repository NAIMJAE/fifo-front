import React, { useState } from 'react'

const RecruitModal = ({handleModal}) => {

    const [recruitInfo, setRecruitInfo] = useState(false);

    const [example, setExample] = useState([
        {
            name : "김선광",
            state : "수락대기"
        },
        {
            name : "박선광",
            state : "수락완료"
        },
        {
            name : "이선광",
            state : "수락거절"
        }
    ]);

    const [recruit, setRecruit] = useState("");

    const overMouse = () => {
     // 마우스 오버에서 값을 넘겨주기에는 성능이 안나올듯 생각해보자   
    }

  return (
    <div className='recruitModalBox' onClick={handleModal}>
        <div className='recruitModal'>
            {example && example.map((each, index) => (
                <div className='cntRow' key={index} style={{justifyContent:"space-between"}} 
                    onMouseOver={() => setRecruitInfo(true)}
                    onMouseLeave={() => setRecruitInfo(false)}>
                    <p>{each.name}</p>
                    <h3>{each.state}</h3>
                </div>
            ))}
            
        </div>
        {recruitInfo && 
            <div className='recruitInfoModal'>
                <div className='cntRow' style={{justifyContent:"space-between"}}>
                    <p>김선광</p>
                    <h3>수락대기</h3>
                </div>
            </div>
        }
    </div>
  )
}

export default RecruitModal