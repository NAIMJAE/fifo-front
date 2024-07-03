import React, { useRef, useState } from "react";
import "../../styles/user/myProfile.scss";
import { Button } from "@mui/material";
import { RootUrl } from "../../api/RootUrl";
import { useSelector } from "react-redux";
import SkillIcon from "../gathering/SkillIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFloppyDisk, faPencil, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const authSlice = useSelector((state) => state.authSlice);

  /** 임시 정보 */
  const [example, setExample] = useState({
    name : "홍길동",
    nick : "우리집삐뽀",
    email : "fifo1234@naver.com",
    hp : "010-1234-1234",
    region : "부산",
    skillList : ["JAVA", "REACT", "HTML", "SPRING", "CSS", "KOREAN"],
  })

  /** input 입력 활성화 상태 관리 useState */
  const [inputModify, setInputModify] = useState({
    name : false,
    nick : false,
    email : false,
    hp : false,
    region : false,
    skill : false,
  });

  const fileInputRef = useRef(null);
  /** 프로필 사진 수정 */
  const modifythumb = () => {
    fileInputRef.current.click();
  }

  /** 기본 정보 편집 input 활성 */
  const changeMyInfo = (e) => {
    const targetId = e.currentTarget.getAttribute('data-target-id');
    const input = document.getElementById(targetId);

    input.style.border = "1px solid #111";
    input.readOnly = false;
    setInputModify(prev => ({...prev, [targetId]:true}))
  }

  /** 기본 정보 수정 */
  const inputMyInfo = (e) => {
    const {name, value} = e.target;
    setExample(prev => ({...prev, [name]: value}));
    console.log("example : ",example);

    // 유효성 검사 넣어주세요

  }

  /** 기본 정보 수정 저장 */
  const saveMyinfo = async (e) => {
    const targetId = e.currentTarget.getAttribute('data-target-id');
    const input = document.getElementById(targetId);

    try {
      // 서버에 수정된 정보 저장하고 오면 됨
      // const response = await Api();
      // if response가 수정 성공이면
      input.style.border = "1px solid white";
      input.readOnly = true;
      setInputModify(prev => ({...prev, [targetId]:false}))

    } catch (error) {
      console.log(error);
    }
  }

  /** 내 스킬 편집 input 활성화 */
  const changeMySkill = (e) => {
    const targetId = e.currentTarget.getAttribute('data-target-id');
    setInputModify(prev => ({...prev, [targetId]:true}))
  }

  /** 내 스킬 편집 */

  /** 내 스킬 편집 저장 */

  return (
<>
    <main>
        <div id='contentArea' style={{marginTop:"20px"}}>
            <div className='cntColumn myProfile'>
                <h1>내 정보 수정</h1>

                <h2>기본 정보</h2>

                <div className="basicInfo">
                    <div className="myThumb">
                        <img src="../../images/ppoppi.png" alt="" />

                        <label htmlFor="thumb">
                            <FontAwesomeIcon icon={faPencil} size="lg" color="#FF0000" onClick={modifythumb}/>
                        </label>
                        <input type="file" id="thumb" ref={fileInputRef}/>
                    </div>

                    <div className="myInfo">
                        <label htmlFor="">
                            <h2>홍길동</h2>
                            <h4>남자</h4>
                            <h4>27세</h4>
                            <h5>2024.05.12 가입</h5>
                        </label>

                        <label htmlFor="">
                            <h3>닉네임 : </h3>
                            <input type="text" id="nick" name="nick" value={example.nick} onChange={(e) => inputMyInfo(e)} readOnly/>
                            {inputModify.nick ? (
                              <FontAwesomeIcon icon={faFloppyDisk} size="lg" color="#7b7b7b" data-target-id="nick" onClick={(e) => saveMyinfo(e)}/>
                            ) : (
                              <FontAwesomeIcon icon={faPencil} size="lg" color="#7b7b7b" data-target-id="nick" onClick={(e) => changeMyInfo(e)}/>
                            )}
                        </label>

                        <label htmlFor="">
                            <h3>이메일 : </h3>
                            <input type="email" value={example.email}/>
                            <FontAwesomeIcon icon={faPencil} size="lg" color="#7b7b7b"/>
                        </label>

                        <label htmlFor="">
                            <h3>연락처 : </h3>
                            <input type="text" value={example.hp}/>
                            <FontAwesomeIcon icon={faPencil} size="lg" color="#7b7b7b"/>
                        </label>

                        <label htmlFor="">
                            <h3>활동지역 : </h3>
                            <input type="text" value={example.region}/>
                            <FontAwesomeIcon icon={faPencil} size="lg" color="#7b7b7b"/>
                        </label>
                    </div>
                </div>

                <h2>내 스킬</h2>
                <div className="mySkill">
                    <div className="inputSkill">
                        {inputModify.skill ? (
                            <input type="text" id="skill"/>
                        ) : (
                            <label htmlFor="" data-target-id="skill" onClick={(e) => changeMySkill(e)}>
                                <p>내 스킬 편집</p>
                                <FontAwesomeIcon icon={faPencil} size="lg" color="#7b7b7b"/>
                            </label>
                        )}
                    </div>

                    <div className="skillList">
                        {example.skillList && example.skillList.map((skill, index) => (
                          <div>
                            <SkillIcon skill={skill} classType={"bigSkillImg"} />
                            <p>{skill}</p>
                            {inputModify.skill && <FontAwesomeIcon icon={faCircleXmark} className="closeBtn" size="lg" color="#FF0000"/>}
                          </div>
                        ))}
                    </div>
                </div>
                <h2>내 경력</h2>
            </div>
        </div>
    </main>
    


    {/**
    <div id="mainDiv">
      <div className="contentDiv">
        <div className="headerDiv">
          <h1>프로필 수정</h1>
          <p>FIFO 프로필을 수정 하실 수 있습니다.</p>
        </div>
        <div className="main">
          <div className="tableDiv">
            <aside>프로필 사진</aside>
            <span>
              <img
                src={`${RootUrl()}/uploads/user/${authSlice.thumb}`}
                alt="profile"
              />
              <button>사진변경</button>
            </span>
          </div>

          <div className="tableDiv">
            <aside>이름</aside>
            <span></span>
          </div>

          <div className="tableDiv">
            <aside>별명</aside>
            <span></span>
          </div>

          <div className="tableDiv">
            <aside>휴대폰</aside>
            <span></span>
          </div>

          <div className="tableDiv">
            <aside>지역</aside>
            <span></span>
          </div>

          <div className="tableDiv">
            <aside>이름</aside>
            <span></span>
          </div>
        </div>

        <div className="footerDiv">
          <Button variant="text">적용</Button>
          <Button variant="text">취소</Button>
        </div>
      </div>
    </div>
     */}
</>
  );
};

export default MyProfile;
