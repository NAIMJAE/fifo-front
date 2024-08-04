import { Box, Modal } from "@mui/material";
import "../../styles/user/FindIdPass.scss";

import React from "react";

const FindId = ({ findIdModalOpen, findIdHandleClose }) => {
  return (
    <div>
      <Modal
        className="findModal"
        open={findIdModalOpen}
        onClose={findIdHandleClose}
      >
        <Box className="modalBox">
          <span className="close-btn" onClick={findIdHandleClose}>
            <p>&times;</p>
          </span>
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
          <h1>이메일 찾기</h1>
          <h2>회원 가입시 입력한 이름과 휴대폰을 입력하시면</h2>
          <h2>해당 이름과 휴대폰으로 가입한 이메일을 찾아드립니다.</h2>

          <div className="inputArea">
            <div className="area name">
              <span className="name">이름</span>
              <input type="text" placeholder="이름을 입력해주세요."></input>
            </div>

            <div className="area hp">
              <span className="hp">휴대폰</span>
              <input type="text" placeholder="휴대폰 입력해주세요."></input>
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

export default FindId;
