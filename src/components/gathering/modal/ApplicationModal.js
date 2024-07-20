import React, { useEffect, useState } from 'react'
import SkillIcon from '../SkillIcon';
import { useSelector } from 'react-redux';
import { applicationApi } from '../../../api/gatheringApi';

const ApplicationModal = ({ handleAppModal, handleApplication }) => {

    const loginSlice = useSelector((state) => state.authSlice) || {};

    /** 한 줄 소개 */
    const [intro, setIntro] = useState("");

    /** 회원 정보 (스킬) */
    const [userSkill, setUserSkill] = useState("");
    /** 회원 정보 (지역) */
    const [userRegion, setUserRegion] = useState("");

    /** 정보 가져오기 */
    useEffect(() => {
        const userInfo = async () => {
            try {
                const response = await applicationApi(loginSlice.userno);
                setUserSkill(response.skill);
                setUserRegion(response.region);
            } catch (error) {
                console.log(error);
            }
        }
        userInfo();
    }, []);

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
    <div className='applicationModalBox' onClick={handleAppModal}>
        <div className='applicationModal' onClick={bubblingBlock}>
            <p>참여 신청</p>

            <h3>닉 네 임 : 삐뽀삐</h3>
            <h3>활동지역 :&nbsp;
                {userRegion && userRegion.map((region, index) => (region.regionname + " "))}
            </h3>
            <h3>사용언어</h3>
            <div className='modalSkill'>
                {userSkill && userSkill.map((skill, index) => (
                    <div key={index}>
                        <SkillIcon skill={skill.languagename} classType='bigSkillImg'/>
                        <span>{skill.languagename}</span>
                    </div>
                ))}
            </div>
            <div className='modalIntro'>
                <p>한줄소개</p>
                <textarea value={intro} onChange={(e)=>setIntro(e.target.value)}></textarea>
            </div>

            <div className='modalBtn'>
                <button onClick={applicationBtn}>신청</button>
                <button onClick={handleAppModal}>취소</button>
            </div>
        </div>
    </div>
  )
}

export default ApplicationModal