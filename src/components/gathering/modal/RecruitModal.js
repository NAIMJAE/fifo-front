import React, { useState } from 'react'
import { acceptRecruitApi } from '../../../api/gatheringApi';

const RecruitModal = ({ recruitList, handleModal, lender, setLender }) => {

    /** 모모달 띄우는 상태 */ 
    const [popState, setPopState] = useState(false);

    /** 모모달에 출력할 정보 */ 
    const [recruit, setRecruit] = useState("");
    
    /** 모달에서 모모달 띄우는 함수 */
    const overMouse = (recruitno) => {
        const foundData = recruitList.find(info => info.recruitno === recruitno);
        setRecruit(foundData);
        setPopState(true);
    }

    /** 신청 수락 */
    const acceptRecruit = async (nick, recruitno) => {
        let result = window.confirm("정말 "+nick+"님의 참여신청을 수락하시겠습니까")
        // 나중에 멘트좀..

        if(result) {
            try {
                const response = await acceptRecruitApi(recruitno, "신청 수락");
                if (response > 0) {
                    alert(nick+"님의 신청이 수락되었습니다.");
                    setLender(!lender);
                    handleModal();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 신청 거절 */
    const refuseRecruit = async (nick, recruitno) => {
        let result = window.confirm("정말 "+nick+"님의 참여신청을 거절하시겠습니까")
        // 나중에 멘트좀..

        if(result) {
            try {
                const response = await acceptRecruitApi(recruitno, "신청 거절");
                if (response > 0) {
                    alert(nick+"님의 신청이 거절되었습니다.");
                    setLender(!lender);
                    handleModal();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

  return (
    <div className='recruitModalBox' onClick={handleModal}>
        <div className='recruitModal' onClick={bubblingBlock}>
            {recruitList && recruitList.map((each) => (
                <div className='cntRow' key={each.recruitno} style={{justifyContent:"space-between"}} 
                    onMouseOver={() => overMouse(each.recruitno)}>
                    <p>{each.nick}</p>
                    <h3>{each.recruitstate}</h3>
                </div>
            ))}
        </div>

        {(popState && recruit) &&
            <div className='recruitInfoModal' onClick={bubblingBlock}>
                <div className='cntColumn'>
                    <p>{recruit.nick}</p>
                    <h3>{recruit.recruitstate}</h3>
                    <h3>{recruit.region}</h3>
                    <h3>{recruit.intro}</h3>
                </div>
                {recruit.recruitstate === "수락 대기" && 
                    <div className='cntRow recruitBtn'>
                        <button onClick={() => acceptRecruit(recruit.nick, recruit.recruitno)}>수락</button>
                        <button onClick={() => refuseRecruit(recruit.nick, recruit.recruitno)}>거절</button>
                    </div>
                }
            </div>
        }  
    </div>
  )
}

export default RecruitModal