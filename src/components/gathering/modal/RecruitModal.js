import React, { useState } from 'react'
import { info } from 'sass';

const RecruitModal = ({ gathno, handleModal }) => {

    /** 모모달 띄우는 상태 */ 
    const [popState, setPopState] = useState(false);

    /** 모모달에 출력할 정보 */ 
    const [recruit, setRecruit] = useState("");
    
    /** 모달에 출력할 정보 */ 
    const [example, setExample] = useState([
        {
            id: 0,
            name: "김선광",
            state: "수락대기",
            pop: false,
            on: 24,
            // 매너온도, 활동지역, 언어레벨?
        },
        {
            id: 1,
            name: "잇응윤",
            state: "수락대기",
            pop: false,
            on: 34,
        },
        {
            id: 2,
            name: "바김재",
            state: "수락대기",
            pop: false,
            on: 100,
        },
    ]);

    /** 모달에서 모모달 띄우는 함수 */
    // example에 있는 유저 상세 정보 넣기
    const overMouse = (index) => {
        const foundData = example.find(info => info.id === index);
        setRecruit(foundData);
        setPopState(true);
    }

  return (
    <div className='recruitModalBox' onClick={handleModal}>
        <div className='recruitModal'>
            {example && example.map((each, index) => (
                <div className='cntRow' key={index} style={{justifyContent:"space-between"}} 
                    onMouseOver={() => overMouse(index)}>
                    <p>{each.name}</p>
                    <h3>{each.state}</h3>
                </div>
            ))}
        </div>

        {(popState && recruit) &&
            <div className='recruitInfoModal'>
                <div className='cntRow' style={{justifyContent:"space-between"}}>
                    <p>{recruit.name}</p>
                    <h3>{recruit.state}</h3>
                    <h3>{recruit.on}도</h3>
                </div>
            </div>
        }  
    </div>
  )
}

export default RecruitModal