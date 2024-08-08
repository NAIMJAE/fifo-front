import React, { useState } from "react";
import "../../styles/user/login.scss";
import { Box, Modal } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FindId from "./FindId";
import FindPass from "./FindPass";
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

  /**아이디, 비밀번호 찾기 */
  const [findHandler, setFindHandler] = useState(null); // 아이디(true), 비밀번호(false) 찾기 상태

  /**아이디 찾기 */
  const findIdHandleClose = () => setFindIdModalOpen(false); //아이디 찾기 모달 끄기 관리
  const [findIdModalOpen, setFindIdModalOpen] = useState(false); // 아이디 찾기 모달 상태 State

  /**비밀번호 찾기 */
  const findPassHandleClose = () => setFindPassModalOpen(false); //비밀번호 찾기 모달 끄기 관리
  const [findPassModalOpen, setFindPassModalOpen] = useState(false); // 비밀번호 찾기 모달 상태 State

  const handlerFind = (e) => {
    e.preventDefault();
    const name = e.target.name;
    console.log(name);
    if (name === "findId") {
      setFindIdModalOpen(true);
    }
    if (name === "findPass") {
      setFindPassModalOpen(true);
    }
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
              로그인
            </button>
          </form>

          <button name="findId" className="btnFind id" onClick={handlerFind}>
            아이디 찾기
          </button>
          <button
            name="findPass"
            className="btnFind pass"
            onClick={handlerFind}
          >
            비밀번호 변경
          </button>
        </Box>
      </Modal>
      {findIdModalOpen && (
        <FindId
          findIdModalOpen={findIdModalOpen}
          findIdHandleClose={findIdHandleClose}
          setFindIdModalOpen={setFindIdModalOpen}
        />
      )}
      {findPassModalOpen && (
        <FindPass
          findPassModalOpen={findPassModalOpen}
          findPassHandleClose={findPassHandleClose}
          setFindPassModalOpen={setFindPassModalOpen}
        />
      )}
    </div>
  );
};

export default LoginComponent;
