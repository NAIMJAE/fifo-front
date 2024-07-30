import React, { useState } from "react";
import "../../styles/user/login.scss";
import { Box, Modal } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginComponent = ({
  setModalOpen,
  handleClose,
  modalOpen,
  user,
  changeHandler,
  handlerLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  /**비밀번호 보여지기 */
  const handlerPasswordVisble = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <Modal className="loginModal" open={modalOpen} onClose={handleClose}>
        <Box className="modalBox">
          <span className="close-btn" onClick={handleClose}>
            <p>&times;</p>
          </span>
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
          <div className="text">
            <p>FIFO에 오신것을 환영합니다!</p>
            <p>FIFO에서 모임을 만들어 프로젝트에 참여해보세요 </p>
          </div>
          <form className="loginForm">
            <span className="idSpan">아이디</span>
            <input
              type="text"
              placeholder="이메일을 입력하세요."
              name="email"
              value={user.email}
              onChange={changeHandler}
            ></input>{" "}
            <br />
            <span className="passSpan">비밀번호</span>
            <input
              type={showPassword ? "text" : "password"}
              name="pass"
              value={user.pass}
              placeholder="비밀번호를 입력하세요."
              onChange={changeHandler}
            ></input>
            {showPassword ? (
              <RemoveRedEyeIcon
                className="eyeIcon"
                onClick={handlerPasswordVisble}
              />
            ) : (
              <VisibilityOffIcon
                className="eyeIcon"
                onClick={handlerPasswordVisble}
              />
            )}
            <button className="btnLogin" onClick={handlerLogin}>
              로그인하기
            </button>
          </form>

          <button className="btnFind id" onClick={handlerLogin}>
            아이디 찾기
          </button>
          <button className="btnFind pass" onClick={handlerLogin}>
            비밀번호 찾기
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginComponent;
