import React, { useEffect, useState } from 'react'
import { acceptRecruitApi } from '../../../api/gatheringApi';
import SkillIcon from '../SkillIcon';
import { RootUrl } from '../../../api/RootUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

const RecruitModal = ({ recruitList, handleModal, lender, setLender }) => {

    console.log(recruitList);

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
        let result = window.confirm(nick+"님의 참여신청을 수락하시겠습니까")
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
                <>
                <div className='userInfo' key={each.recruitno}>
                    <div className='infoNick'>
                        <div>
                            <img src={`${RootUrl()}/uploads/user/${each.thumb}`} alt="profile" />
                            <div>
                                <p>{each.nick} ({each.recruitstate})</p>
                                <div className='infoRegion'>
                                    {each.userRegions.length > 0 ? (each.userRegions.map((region, index) => (
                                        <h4 key={index}>{region.regionname}</h4>
                                    ))) : (
                                        <h4>없음</h4>
                                    )}
                                </div>
                            </div>
                        </div>
                        {each.recruitstate === "수락 대기" ? (
                            <div className='cntRow recruitBtn'>
                                <button onClick={() => acceptRecruit(each.nick, each.recruitno)}>수락</button>
                                <button onClick={() => refuseRecruit(each.nick, each.recruitno)}>거절</button>
                            </div>
                        ) : (
                            <h3>{each.recruitstate}</h3>
                        )}
                    </div>

                    <div className='modalSkill'>
                        <FontAwesomeIcon icon={faReply} flip="both" size='2xl' color='#7b7b7b'/>
                        {each.skill.length > 0 ? (each.skill.map((skill, index) => (
                            <div key={index}>
                                <SkillIcon skill={skill.languagename} classType='skillImg'/>
                                <span>{skill.languagename}</span>
                            </div>
                        ))) : (
                            <h4>없음</h4>
                        )}
                    </div>
                    
                </div>

                
                </>
            ))}
        </div>
    </div>
  )
}

export default RecruitModal