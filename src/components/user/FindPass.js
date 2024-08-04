import { Box, Modal } from "@mui/material";
import "../../styles/user/FindIdPass.scss";

import React from "react";

const FindPass = ({ findPassModalOpen, findPassHandleClose }) => {
  return (
    <div>
      <Modal
        className="findModal"
        open={findPassModalOpen}
        onClose={findPassHandleClose}
      >
        <Box className="modalBox">
          <span className="close-btn" onClick={findPassHandleClose}>
            <p>&times;</p>
          </span>
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
          <h1>비밀번호 찾기</h1>
          <h2>회원 가입시 입력한 이메일과 이름을 입력하시면</h2>
          <h2>이메일 인증 후 비밀번호를 변경 하실 수 있습니다.</h2>
          <div className="inputArea">
            <div className="area hp">
              <span className="name">이름</span>
              <input type="text" placeholder="이름을 입력해주세요."></input>
            </div>

            <div className="area name">
              <span className="email">이메일</span>
              <input type="email" placeholder="이메일을 입력해주세요."></input>
            </div>

            <span className="spanBtn">
              <button>찾기</button>
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FindPass;
