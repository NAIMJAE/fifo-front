import React from "react";
import "../../styles/user/myProfile.scss";
import { Button } from "@mui/material";
import { RootUrl } from "../../api/RootUrl";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const authSlice = useSelector((state) => state.authSlice);

  return (
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
  );
};

export default MyProfile;
