import { id } from 'date-fns/locale';
import React, { useEffect, useState } from 'react'

const RecruitModal = ({handleModal}) => {

    const [recruitInfo, setRecruitInfo] = useState(false);

    const [example, setExample] = useState([
        {
            id: 0,
            name : "김선광",
            state : "수락대기"
        },
        {
            id: 1,
            name : "박선광",
            state : "수락완료"
        },
        {
            id: 2,
            name : "이선광",
            state : "수락거절"
        }
    ]);

    const [recruit, setRecruit] = useState([
        {
            id: 0,
            state: false,
        },
        {
            id: 1,
            state: false,
        },
        {
            id: 2,
            state: false,
        },
    ]);

    useEffect(() => {
        const recruitInfo = () => {
            try {
                // 서버에서 받아오기?
                // const response = await Api();
                //setExample(response);
                //setRecruit
            } catch (error) {
                console.log(error);
            }
        }
        recruitInfo();

    }, [])

    const overMouse = (index) => {
        setRecruit(prev =>
            prev.map(recruit =>
                recruit.id === index ? { ...recruit, state: true } : recruit
            )
        );
        setRecruitInfo(true);
    }

    const leaveMouse = (index) => {
        setRecruit(prev =>
            prev.map(recruit =>
                recruit.id === index ? { ...recruit, state: false } : recruit
            )
        );
        setRecruitInfo(false);
    }

  return (
    <div className='recruitModalBox' onClick={handleModal}>
        <div className='recruitModal'>
            {example && example.map((each, index) => (
                <div className='cntRow' key={index} style={{justifyContent:"space-between"}} 
                    onMouseOver={() => overMouse(index)}
                    onMouseLeave={() => leaveMouse(index)}>
                    <p>{each.name}</p>
                    <h3>{each.state}</h3>
                </div>
            ))}
            
        </div>
        {recruitInfo && recruit.find(info => info.state) ? (
            <div className='recruitInfoModal'>
                <div className='cntRow' style={{justifyContent:"space-between"}}>
                    <p>김선광</p>
                    <h3>수락대기</h3>
                </div>
            </div>
        ) : (
            <div className='recruitInfoModal'>
                <div className='cntRow' style={{justifyContent:"space-between"}}>
                    <p>없음</p>
                    <h3>없음</h3>
                </div>
            </div>
        )}
    </div>
  )
}

export default RecruitModal