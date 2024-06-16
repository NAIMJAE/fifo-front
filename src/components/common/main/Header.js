import React, { useState } from "react";
import "../../../styles/header.scss";
import "../../../styles/user/login.scss";
import { Link, Navigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import axios from "axios";
import { globalPath } from "../../../globalPaths";
import { useDispatch } from "react-redux";
import { login } from "../../../slices/authSlice";

const Header = () => {
  /**모달 창 상태 관리 */
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  /**로그인 관리 */
  const dispatch = useDispatch;
  const [user, setUser] = useState({
    email: "",
    pass: "",
  });
  const [err, setError] = useState("");

  /** 로그인값 입력  */
  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  /**로그인 버튼 클릭 */
  const handlerLogin = (e) => {
    e.preventDefault();
    const url = globalPath.path;
    axios
      .post(`${url}/user/login`, user)
      .then((resp) => {
        console.log(resp.data);
        // 리덕스 액션 실행 : 로그인 성공 시 사용자 정보를 리덕스 상태에 저장
        dispatch(login(resp.data));
        // 모달 창 끄기
        //setModalOpen(false)
        Navigate("/");
        alert("로그인에 성공하셨습니다");
      })
      .catch((err) => {
        console.log(err);
        setError("아이디 또는 비밀번호가 틀렸습니다. 다시 확인해주세요.");
      });
  };

  return (
    <header>
      <div>
        <div></div>
        <div id="headerInfo">
          <Link to="#" onClick={handleOpen}>
            로그인
          </Link>
          <Link to="/">마이페이지</Link>
          <Link to="/">로그아웃</Link>
        </div>
      </div>

      <div>
        <Link to="/" id="headerLogo">
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
        </Link>

        <div id="navInfo">
          <Link to="/develop">개발참조</Link>
          <Link to="/">내모임</Link>
          <Link to="/gathering/list">모임찾기</Link>
          <Link to="/article/list">게시판</Link>
          <Link to="/">등급평가</Link>
        </div>
      </div>
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
    </header>
  );
};

export default Header;
