import React, { useState } from 'react'
import { acceptRecruitApi } from '../../../api/gatheringApi';
import SkillIcon from '../SkillIcon';
import { RootUrl } from '../../../api/RootUrl';

const RecruitModal = ({ recruitList, handleModal, lender, setLender }) => {

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
                }else {
                    alert("모임 참여 인원을 초과했습니다.");
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
            <h1>모임 지원자 정보</h1>
            {recruitList && recruitList.map((each) => (
                <div className='userInfo' key={each.recruitno}>
                    <div className='infoNick'>
                        <div>
                            <img src={`${RootUrl()}/uploads/user/${each.thumb}`} alt="profile" />
                            <div>
                                <div className='infoRegion'>
                                    <p>{each.nick}</p>
                                    <img src="../../images/user/stack_icon.png" alt="profile" />
                                    <h3>{each.stack}</h3>
                                    <span>[</span>
                                    {each.userRegions.length > 0 ? (each.userRegions.map((region, index) => (
                                        <span key={index}>{region.regionname}</span>
                                    ))) : (
                                        <span>없음</span>
                                    )}
                                    <span>]</span>

                                </div>
                                <div className='modalSkill'>
                                    {each.skill.length > 0 ? (each.skill.map((skill, index) => (
                                        <div key={index}>
                                            <SkillIcon skill={skill.languagename} classType='skillImg'/>
                                            <span>{skill.languagename}</span>
                                        </div>
                                    ))) : (
                                        <>
                                        </>
                                    )}
                                </div>

                                <div className='modalSkill'>
                                    <p>한줄 소개 : {each.intro}</p>
                                </div>

                            </div>
                        </div>
                        {each.recruitstate === "수락 대기" ? (
                            <div className='cntRow recruitBtn'>
                                <button onClick={() => acceptRecruit(each.nick, each.recruitno)}>수락</button>
                                <button onClick={() => refuseRecruit(each.nick, each.recruitno)}>거절</button>
                            </div>
                        ) : (
                            <>
                                {each.recruitstate === "수락 대기" && <h3>{each.recruitstate}</h3>}
                                {each.recruitstate === "신청 수락" && <h3 style={{color:"green"}}>{each.recruitstate}</h3>}
                                {each.recruitstate === "신청 거절" && <h3 style={{color:"#FF0000"}}>{each.recruitstate}</h3>}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RecruitModal