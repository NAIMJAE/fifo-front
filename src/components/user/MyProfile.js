import React, { useRef } from "react";
import "../../styles/user/myProfile.scss";
import { Button } from "@mui/material";
import { RootUrl } from "../../api/RootUrl";
import { useSelector } from "react-redux";
import SkillIcon from "../gathering/SkillIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const authSlice = useSelector((state) => state.authSlice);

  const fileInputRef = useRef(null);
  /** 내 정보 수정 */
  const modifythumb = () => {
    fileInputRef.current.click();
  }

  return (
<>
    <main>
        <div id='contentArea' style={{marginTop:"20px"}}>
            <div className='cntColumn myProfile'>
                <h1>내 정보 수정</h1>

                <h2>기본 정보</h2>

                <div className="basicInfo">
                    <div className="myThumb">
                        <img src="../../images/article/deleteUserIcon.svg" alt="" />

                        <label htmlFor="thumb">
                            <FontAwesomeIcon icon={faPencil} size="lg" color="#FF0000" onClick={modifythumb}/>
                        </label>
                        <input type="file" id="thumb" ref={fileInputRef}/>
                    </div>

                    <div className="myInfo">
                        <h3>홍길동</h3>
                        <h4>우리집삐뽀</h4>
                        <label htmlFor="">
                            <h3>fifo1234@gamil.com</h3>
                            <h3>010-1234-1243</h3>
                        </label>

                        <label htmlFor="">
                            <h4>남자</h4>
                            <h4>27세</h4>
                            <h4>부산</h4>
                        </label>

                        <h5>2024.05.12 가입</h5>
                    </div>
                </div>
                <h2>내 스킬</h2>
                
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
