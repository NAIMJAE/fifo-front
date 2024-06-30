import React, { useState } from "react";
import "../../styles/user/login.scss";
import { Box, Modal } from "@mui/material";

const LoginComponent = ({
  setModalOpen,
  handleClose,
  modalOpen,
  user,
  changeHandler,
  handlerLogin,
}) => {
  return (
    <div className="login">
      <Modal className="loginModal" open={modalOpen} onClose={handleClose}>
        <Box className="modalBox">
          <span className="close-btn" onClick={handleClose}>
            <p>&times;</p>
          </span>
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
          <h1>FIFO에 오신것을 환영합니다!</h1>
          <h3>FIFO에서 모임을 만들어 프로젝트에 참여해보세요 </h3>
          <span>아이디</span>
          <input
            type="text"
            placeholder="이메일을 입력하세요."
            name="email"
            value={user.email}
            onChange={changeHandler}
          ></input>{" "}
          <br />
          <span>비밀번호</span>
          <input
            type="pass"
            name="pass"
            value={user.pass}
            placeholder="비밀번호를 입력하세요."
            onChange={changeHandler}
          ></input>
          <button onClick={handlerLogin}>로그인하기</button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginComponent;
