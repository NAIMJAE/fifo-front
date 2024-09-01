import React, { useEffect, useState } from "react";
import "../../../styles/header.scss";
import "../../../styles/user/login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RootUrl } from "../../../api/RootUrl";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../slices/authSlice";
import LoginModal from "../../user/LoginModal";
import { removeCookie } from "../../../utils/cookieUtil";

const Header = () => {
  /**모달 창 상태 관리 */
  const [modalOpen, setModalOpen] = useState(false);
  const [loginState, setLoginState] = useState("");
  const handleClose = () => setModalOpen(false);

  const handleOpen = () => setModalOpen(true);

  const authSlice = useSelector((state) => state.authSlice);

  useEffect(() => {
    setLoginState(authSlice.userno);
    console.log(loginState);
  }, [authSlice.userno]);

  /**로그인 관리 */
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

  const [err, setError] = useState("");

  /** 로그인값 입력  */
  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /**로그인 버튼 클릭 */
  const handlerLogin = (e) => {
    e.preventDefault();
    const url = RootUrl();
    axios
      .post(`${url}/user/login`, user, { withCredentials: true })
      .then((resp) => {
        console.log(resp.data);

        // 리덕스 액션 실행 : 로그인 성공 시 사용자 정보를 리덕스 상태에 저장
        dispatch(login(resp.data));

        setModalOpen(false);
        alert("로그인에 성공하셨습니다");
      })
      .catch((err) => {
        console.error(err.response.data);
        alert(err.response.data); // 서버에서 반환된 오류 메시지 출력
      });
  };

  const navigate = useNavigate();

  /**로그아웃 버튼 클릭 */
  const handlerLogout = (e) => {
    e.preventDefault();

    dispatch(logout());

    navigate(`/`);

    window.location.reload();

    alert("로그아웃 되었습니다.");
  };

  /** 강제 리랜더링 */
  const handleLinkClick = (e) => {
    e.preventDefault();
    console.log(e.target.href);
    window.location.href = e.target.href;
  };

  return (
    <header>
      <div>
        <div></div>
        <div id="headerInfo">
          {loginState === undefined || "" ? (
            <>
              {" "}
              <Link to="#" onClick={handleOpen}>
                로그인
              </Link>
              <Link to="/user/register">회원가입</Link>{" "}
            </>
          ) : (
            <>
              <Link to="/user/myPage">마이페이지</Link>
              <Link to="#" onClick={handlerLogout}>
                로그아웃
              </Link>
            </>
          )}
        </div>
      </div>

      <div>
        <Link to="/" id="headerLogo">
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
        </Link>

        <div id="navInfo">
          <Link to="/gathering/list">내모임</Link>
          <Link to="/">모임찾기</Link>
          <Link to="/article/list">게시판</Link>
          <Link to="/grade">등급평가</Link>
        </div>
      </div>
      <LoginModal
        modalOpen={modalOpen}
        handleClose={handleClose}
        setModalOpen={setModalOpen}
        user={user}
        changeHandler={changeHandler}
        handlerLogin={handlerLogin}
      />
    </header>
  );
};

export default Header;
