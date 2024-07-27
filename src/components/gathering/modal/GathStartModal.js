import React, { useEffect, useState } from 'react'
import SkillIcon from '../SkillIcon'
import { selectGathStartApi, startMooimApi } from '../../../api/gatheringApi';
import { RootUrl } from '../../../api/RootUrl';

const GathStartModal = ({ modalData, handleStartModal }) => {

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

    /** 모임 신청자 정보 */
    const [recruitMember, setRecruitMember] = useState([]);

    /** 모임 제목 */
    const [mooimtitle, setMooimTitle] = useState("");

    /** 모임 신청 정보 불러오기 */
    useEffect(() => {
        const selectGathStart = async () => {
            try {
                const response = await selectGathStartApi(modalData.gathno);
                setRecruitMember(response);
            } catch (error) {
                console.log(error);
            }
        }  
        selectGathStart();
    },[])

    /** 모임 시작 */
    const handleStartMooim = async () => {

        if(mooimtitle != "") {

            const data = {
                mooimtitle: mooimtitle,
                gathno: recruitMember[0].gathno,
                recruitMember: recruitMember
            };

            try {
                const response = await startMooimApi(data);
                console.log("모임 번호 : ",  response);
            } catch (error) {
                console.log(error);
            }
        }else {
            alert('모임명 입력은 필수입니다.');
            return;
        }

    } 
    
  return (
    <div className='gathStartModalBox' onClick={handleStartModal}>
        <div className='gathStartModal' onClick={bubblingBlock}>
            <div>
                <p>모임 시작하기</p>

                <div className='gathType'>
                    <div>
                        <span>모임 유형</span>
                        <span>
                            {modalData.gathcate === 1 ? '프로젝트' :
                                modalData.gathcate === 2 ? '스터디' :
                                    modalData.gathcate === 3 ? '모임' : '알 수 없음'}
                        </span>
                    </div>
                    <div>
                        <span>모임 방식</span>
                        <span>{modalData.gathmode}</span>
                    </div>
                </div>

                <div className='gathMember'>
                    <p>모임 멤버</p>
                    {recruitMember && recruitMember.map((each, index) => (
                        <div className='member' key={index}>
                            <img src={`${RootUrl()}/uploads/user/${each.thumb}`} alt="profile" />
                            <div>
                                <div>
                                    <h1>{each.nick}</h1>
                                    <img src="../../images/user/stack_icon.png" alt="profile" />
                                    <h3>{each.stack}</h3>
                                </div>
                                <div className='modalSkill'>
                                    {each.skill && each.skill.map((skill, index) => (
                                        <div key={index}>
                                            <SkillIcon skill={skill.languagename} classType='skillImg'/>
                                            <span>{skill.languagename}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className='modalSkill'>
                                    <p>{each.intro}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='gathTitle'>
                    <p>모임명</p>
                    <input type="text" value={mooimtitle} onChange={(e) => setMooimTitle(e.target.value)}/>
                </div>

                <div className='warning'>
                    <p>모임명은 수정 불가능합니다.</p>
                </div>

                <div className='gathBtn'>
                    <button onClick={handleStartMooim}>시작</button>
                    <button onClick={handleStartModal}>취소</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GathStartModal