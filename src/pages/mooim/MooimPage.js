import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import Breadcrumb from '../../components/common/main/Breadcrumb';
import '../../styles/mooim.scss';
import { Link, useLocation } from 'react-router-dom';
import SkillIcon from '../../components/gathering/SkillIcon';
import { selectMooimApi } from '../../api/gatheringApi';
import { RootUrl } from '../../api/RootUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

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

  /** 모임 소개 변경 */
  const [mooimIntro, setMooimIntro] = useState(
    {
      state: false,
      // value는 모임 메인 페이지 조회할때 db 조회해온 내용 넣어주면됨
      value: "간단한 웹사이트를 만드는 프로젝트입니다.",
    }
  );

  /** 모임 소개 변경 함수 */
  const modifyIntro = async () => {
    if (mooimIntro.state) {
      try {

        // 여기에 변경된 모임 소개글 DB에 저장하는 Api
        // const response = await Api();

        /* respone 성공한 이후에 Mooim state의 intro 부분 변경
        setMooim((prevMooim) => ({
          ...prevMooim,
          intro: mooimIntro.value,
        }));
        */
        alert("모임 소개글이 변경되었습니다.");

      } catch (error) {
        console.log(error);
      }
    }
    setMooimIntro((prevState) => ({
      ...prevState,
      state: !prevState.state,
    }));
  }

  /** 모임 소개 변경 UI 활성화 useEffect */
  useEffect(() => {
    const intro = document.getElementById('intro');
    if (intro) {
      if (mooimIntro.state) {
        intro.style.border = "1px solid #7b7b7b";
        intro.readOnly = false;
      } else {
        intro.style.border = "none";
        intro.readOnly = true;
      }
    }
  }, [mooimIntro.state]);

  /** input 태그 가로 크기 내용물에 맞게 자동 조절 함수 */
  const introRef = useRef(null);

  const adjustInputWidth = () => {
    if (introRef.current) {
      introRef.current.style.width = `${introRef.current.scrollWidth}px`;
    }
  };

  useEffect(() => {
    adjustInputWidth(); // 초기 값으로 설정
  }, [mooimIntro.value]);

  // 여기까지가 크기 조절 함수


  /** 변경할 이미지 선택하는 창 띄우는 함수 */
  const changeThumb = () => {
    document.getElementById('thumbInput').click();
  };

  /** 이미지 변경 함수 */
  const saveThumb = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      try {
        // 이미지 업로드 API
        // const response = await Api(formData);
        
        /* 업로드된 이미지 URL을 응답에서 받아와서 상태 업데이트
        if (response) {
          setMooim((prevMooim) => ({
            ...prevMooim,
            thumb: response.thumb,
          }));
        }
        */
        alert("모임 대표사진이 변경되었습니다.");
      } catch (error) {
        console.error(error);
      }
    }
  };


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
            <FontAwesomeIcon icon={faPencil} size="lg" color="#7b7b7b" onClick={changeThumb} />
            <input type="file" id="thumbInput" style={{ display: 'none' }} onChange={saveThumb} />

            <div>
              <h1>{mooim.mooimtitle}<span>[{mooim.mooimstate === 1 ? '진행중' : mooim.mooimstate === 2 ? '완료' : ''}]</span></h1>

              <label htmlFor="">
                <input type='text' id='intro' readOnly value={mooimIntro.value} 
                  onChange={(e) => {
                    setMooimIntro({ ...mooimIntro, value: e.target.value });
                    adjustInputWidth();
                  }}
                  ref={introRef}
                  style={{ width: `${mooimIntro.value.length}ch` }}
                />

                {mooimIntro.state ? (
                  <FontAwesomeIcon onClick={modifyIntro} icon={faSave} size="lg" color="#7b7b7b"/>
                ) : (
                  <FontAwesomeIcon onClick={modifyIntro} icon={faPencil} size="lg" color="#7b7b7b"/>
                )}
              </label>

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
