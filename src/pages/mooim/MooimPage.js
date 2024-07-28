import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import Breadcrumb from '../../components/common/main/Breadcrumb';
import '../../styles/mooim.scss';
import { Link, useLocation } from 'react-router-dom';
import SkillIcon from '../../components/gathering/SkillIcon';
import { selectMooimApi } from '../../api/gatheringApi';
import { RootUrl } from '../../api/RootUrl';

const MooimPage = () => {

  // URL에서 파라미터값 추출
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let mooimno = queryParams.get('mooimno');

  /** 모임 데이터 */
  const [mooim, setMooim] = useState([]);

  /** 임시 데이터 */
  const barData = 40;

  /** 모임 진행도 막대 */
  useEffect(() => {
    const bar = document.getElementById('bar');
    if (bar) {
      bar.style.width = barData + '%';
    }
  }, [barData]);

  /** 모임 불러오기 */
  useEffect(() => {
    const selectMooim = async () => {
      try {
        const response = await selectMooimApi(mooimno);
        setMooim(response);
        console.log(response);
      } catch (error) {
        console.log(error);
        alert("모임을 찾을 수 없습니다.");
      }
    };
    selectMooim();
  }, [mooimno]);

  return (
    <MainLayout>
      <Breadcrumb crumb={"모임? / 모임인덱스?"} />
      <div className='mooimIndex'>
        <div className='Info'>
          <div className='mooimInfo'>
            {mooim.thumb && mooim.thumb.trim() ? (
              <img src={`${RootUrl()}/uploads/mooim/thumb/${mooim.thumb}`} alt="thumb" />
            ) : (
              <img src="../../images/sample/ppoppi_angry.png" alt="sample" />
            )}
            <div>
            <h1>{mooim.mooimtitle}<span>[{mooim.mooimstate === 1 ? '진행중' : mooim.mooimstate === 2 ? '완료' : ''}]</span></h1>
              <h2>쇼핑몰과 게시판 기능을 합친 간단한 웹사이트 구축 프로젝트</h2>
              <div>
                <h2>{mooim.mooimcate === 1 ? '프로젝트' : mooim.mooimcate === 2 ? '스터디' : mooim.mooimcate === 3 ? '모임' : ''}</h2>
              </div>
              <div>
                <h3>{mooim.mooimstart} ~ </h3>
              </div>
            </div>
          </div>
          <div className='mooimProgress'>
            <div>
              <div id='bar'>40
                <img src="../../../../images/mooim/ppoppi_bar.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className='function'>
          <Link to={"/"}>정보</Link>
          <Link to={"/"}>채팅</Link>
          <Link to={"/"}>캘린더</Link>
          <Link to={"/"}>칸반</Link>
          <Link to={"/"}>문서</Link>
        </div>
        <div className='memberList'>
          {mooim.memberList && mooim.memberList.map((member, index) => (
            <div className='member' key={index}>
              <img src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
              <div>
                <h1>{member.usersDTO.nick}</h1>
                <div className='skill'>
                  {member.usersDTO.skillList && member.usersDTO.skillList.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <SkillIcon skill={skill.languagename} classType='skillImg' />
                      <span>{skill.languagename}</span>
                    </div>
                  ))}
                </div>
              </div>
              {mooim.userno === member.userno ? (<span className='badge'>팀장</span>) : null}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default MooimPage;
