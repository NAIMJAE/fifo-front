import React, { useState } from "react";
import { Link } from "react-router-dom";
import { globalPath } from "../../globalPaths";
import "../../styles/user/register.scss";
import axios from "axios";

const url = globalPath.path;

const Register = () => {
  const [register, setRegister] = useState({
    email: "",
    pass: "",
    name: "",
    nick: "",
  });

  /**회원가입 입력 정보 저장 */
  const handlerRegister = (e) => {
    e.preventDefault();
    setRegister({ ...register, [e.target.name]: e.target.value });
    console.log(register);
  };

  /**회원가입 버튼 클릭 */
  const handlerSubmitClick = (e) => {
    e.preventDefault();
    const { email, pass, name, nick } = register;

    if (!email) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (!pass) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (!name) {
      alert("이름을 입력해주세요");
      return;
    }
    if (!nick) {
      alert("닉네임을 입력해주세요");
      return;
    } else {
      axios
        .post(`${url}/user/register`, register)
        .then((response) => {
          console.log(response.data);
          alert("회원가입이 완료되었습니다.");
        })
        .catch((err) => {
          console.log(err);
          alert("회원가입에 실패했습니다.");
        });
    }
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          className="registerPpoppi"
          src="../../../../images/ppoppi_in_my_house.png"
          alt=""
        />
      </Link>
      <h2>FIFO에 오신것을 환영합니다.</h2>
      <p className="FIFOIs">FIFO는 개발자를 위한 모임 플랫폼입니다!</p>
      <div className="text-sm">
        <span className="bg-text">
          회원가입에 필요한 기본정보를 입력해주세요.
        </span>
      </div>
      <form>
        <div className="input-div">
          <label className="textLabel">이메일</label>
          <input
            name="email"
            value={register.email}
            onChange={handlerRegister}
            className="inputElement"
            type="text"
            placeholder="예시) example@fifo.com"
          ></input>

          <label className="textLabel">비밀번호</label>
          <input
            name="pass"
            value={register.pass}
            onChange={handlerRegister}
            className="inputElement"
            type="password"
          ></input>

          <label className="textLabel">이름</label>
          <input
            name="name"
            value={register.name}
            onChange={handlerRegister}
            className="inputElement"
            type="text"
            placeholder="김뽀삐"
          ></input>

          <label className="textLabel">닉네임</label>
          <input
            name="nick"
            value={register.nick}
            onChange={handlerRegister}
            className="inputElement"
            type="text"
            placeholder="별명을 알파벳, 한글, 숫자를 10자 이하로 입력해주세요"
          ></input>

          <label className="textLabel">관심태그</label>

          <div className="terms-agree">약관동의</div>

          <div className="terms-all-div">
            <label className="agreeAll-label">
              <input type="checkbox" />
              <span>전체동의</span>
              <span className="all-agree-span">
                전체 동의를 선택하시면 아래의 모든 약관에 동의하게 됩니다.
              </span>
            </label>

            <div className="terms-div">
              <input type="checkbox" />
              <input type="checkbox" />
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="btnSubmit"
          value={"회원가입"}
          onClick={handlerSubmitClick}
        />
      </form>
    </div>
  );
};

export default Register;
