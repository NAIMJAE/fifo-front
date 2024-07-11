import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalPath } from "../../globalPaths";
import "../../styles/user/register.scss";
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Backdrop from "../common/backdrop/backdrop.js";
import TermsModal from "./termsModal.js";
import SkillIcon from "../gathering/SkillIcon";
import axios from "axios";

const url = globalPath.path;

const Register = () => {
  /**회원가입 정보 state */
  const [register, setRegister] = useState({
    email: "",
    pass: "",
    name: "",
    nick: "",
  });

  // useEffect(() => {
  //   console.log(register);
  // }, [register]);

  /**유효성 검사 */
  const [emailValid, setEmailValid] = useState(true); // 이메일 유효성 상태
  const [passValid, setPassValid] = useState(true); // 비밀번호 유효성 상태
  const [nameValid, setNameValid] = useState(true); // 이름 유효성 상태
  const [nickValid, setNickValid] = useState(true); // 닉네임 유효성 상태

  useEffect(() => {
    console.log(emailValid);
  }, [emailValid]);

  /**이메일 검사 함수 */
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(email));
  };
  /**비밀번호 검사 함수 */
  const isValidPass = (pass) => {
    const passPattern =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    setPassValid(passPattern.test(pass));
  };
  /**이름 검사 함수 */
  const isValidName = (name) => {
    const namePattern = /^(?=.*[가-힣]{2,})|(?=.*[a-zA-Z]{4,})$/;
    setNameValid(namePattern.test(name));
  };
  /**닉네임 검사 함수 */
  const isValidNick = (nick) => {
    const nickPattern =
      /^(?=.*[가-힣]{2,})(?!.*[^\가-힣a-zA-Z0-9]).{2,10}$|^(?=.*[a-zA-Z]{4,})(?!.*[^\가-힣a-zA-Z0-9]).{4,10}$/;
    setNickValid(nickPattern.test(nick));
  };

  /**적기 시작할 때 유효성검사 */
  const handlerEmailInput = () => {
    setEmailValid(false);
  };
  const handlerPassInput = () => {
    setPassValid(false);
  };
  const handlerNameInput = () => {
    setNameValid(false);
  };
  const handlerNickInput = () => {
    setNickValid(false);
  };

  /**약관 체크관리 state */
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  /**전체 선택 체크박스 상태 관리 함수 */
  const handlerAllCheck = () => {
    setIsAllChecked(!isAllChecked);
  };

  /**전체 동의 체크 시 */
  useEffect(() => {
    if (isAllChecked) {
      setCheck1(true);
      setCheck2(true);
    } else if (!isAllChecked) {
      setCheck1(false);
      setCheck2(false);
    }
  }, [isAllChecked]);

  const handlerCheck1 = () => {
    setCheck1(!check1);
  };

  const handlerCheck2 = () => {
    setCheck2(!check2);
  };

  /**비밀번호 보이기 관리 */
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /**backdrop 관리 state */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  /**회원가입 입력 정보 저장
   * 유효성 검사 실행
   */
  const handlerRegister = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      [name]: value,
    }));

    if (name === "email") {
      isValidEmail(value);
    }
    if (name === "pass") {
      isValidPass(value);
    }
    if (name === "name") {
      isValidName(value);
    }
    if (name === "nick") {
      isValidNick(value);
    }
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
    }
    if (!check1) {
      alert("서비스 이용약관에 동의하셔야합니다.");
      return;
    }
    if (!check2) {
      alert("개인정보 처리방침에 동의하셔야합니다.");
      return;
    }
    if (!emailValid) {
      alert("이메일이 올바르지 않습니다.");
      return;
    }
    if (!passValid) {
      alert("비밀번호가 올바르지 않습니다.");
      return;
    }
    if (!nameValid) {
      alert("이름이 올바르지 않습니다.");
      return;
    }
    if (!nickValid) {
      alert("닉네임이 올바르지 않습니다.");
      return;
    } else {
      setOpen(true);
      setTimeout(async () => {
        await axios
          .post(`${url}/user/register`, register)
          .then((response) => {
            console.log(response.data);

            alert("회원가입이 완료되었습니다.");
            alert("회원 정보 입력을 위해 마이페이지로 이동합니다.");

            navigate(`/user/myPage`);
          })
          .catch((err) => {
            console.log(err);
            alert("회원가입에 실패했습니다.");
          })
          .finally(() => {
            setOpen(false);
          });
      }, 1000);
      /**스킬 넣기 */
    }
  };

  /**비밀번호 보여지기 */
  const handlerPasswordVisble = () => {
    setShowPassword(!showPassword);
  };

  /** 약관 모달 관리 */
  const termsModalClose = () => setOpenTerms(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [handlerModal, setHandlerModal] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");

  /**약관 보여지기 */
  const viewTerms = async (e) => {
    e.preventDefault();
    setHandlerModal("terms");
    await axios
      .post(`${url}/user/terms`)
      .then((response) => {
        setTerms(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenTerms(true);
  };

  /**정보 처리방침 보여지기 */
  const viewPrivacy = async (e) => {
    e.preventDefault();

    setHandlerModal("privacy");

    await axios
      .post(`${url}/user/privacy`)
      .then((response) => {
        setPrivacy(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenTerms(true);
  };

  /**스킬 리스트 가져오기*/
  const [skillList, setSkillList] = useState([]);
  const [skillSelect, setSkillSelect] = useState([]);

  useEffect(() => {}, [skillSelect]);
  useEffect(() => {
    axios
      .get(`${url}/user/language`)
      .then((response) => {
        console.log(response.data);
        setSkillList(response.data.map((language) => language.languagename));
        setSkillSelect(
          response.data.map((language, index) => ({
            id: index,
            state: false,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**스킬 아이콘  */
  const iconClick = (e, index) => {
    // e.preventDefault();
    console.log(e.target.value);

    setSkillSelect((prev) =>
      prev.map((lan) =>
        lan.id === index ? { ...lan, state: !lan.state } : lan
      )
    );
  };

  /**이메일 셀렉트 관리 */
  const [selectEmail, setSelectEmail] = useState("");

  const options = [
    "@naver.com",
    "@gamil.com",
    "@daum.com",
    "@nate.com",
    "@outlook.com",
    "직접입력",
  ];

  /**이메일 옵션 선택시 register.email뒤에 값 입력 */
  const selectOptions = (e) => {
    const selectedValue = e.target.value;
    setSelectEmail(selectedValue);

    if (selectedValue === "직접입력") {
      setSelectEmail("");
    } else {
      setRegister((prevRegister) => ({
        ...prevRegister,
        email: prevRegister.email + selectedValue,
      }));
    }
  };

  /** 4글자 이상 입력 되었을 때 select 창 생성
   * 셀렉트가 선택되면 select 창 없애기*/
  const getEmailClassName = () => {
    if (register.email.length >= 4 && selectEmail === "") {
      return "afterEmail";
    } else {
      return "afterEmailNone";
    }
  };

  /**적은거 사라지면 setSelectEmail에 값 비워줘서
   * 다시 className변경 => select 보이게 하기
   */
  useEffect(() => {
    if (register.email.length <= 2) {
      console.log("셋셀렉트이메일 초기화!");
      setSelectEmail("");
    }
  }, [register.email]);

  useEffect(() => {
    console.log("셀렉트바뀜!");
    console.log(selectEmail);
  }, [selectEmail]);

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
      <form className="registerForm">
        <div className="input-div">
          <label className="textLabel">이메일</label>
          <input
            name="email"
            value={register.email}
            onChange={handlerRegister}
            onInput={handlerEmailInput}
            className="inputEmail"
            type="text"
            placeholder="예시) example@fifo.com"
          ></input>
          <select className={getEmailClassName()} onChange={selectOptions}>
            {options.map((email, index) => (
              <option key={index} value={email}>
                {email}
              </option>
            ))}
          </select>
          {!emailValid && (
            <span className="validContext">올바르지 않은 이메일입니다.</span>
          )}
          <label className="textLabel">비밀번호</label>
          <div className="passContainer">
            <input
              name="pass"
              value={register.pass}
              onChange={handlerRegister}
              className="inputElement"
              onInput={handlerPassInput}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호는 8자 이상, 특수문자를 입력해주세요"
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
            {!passValid && (
              <span className="validContext">
                올바르지 않은 비밀번호입니다.
              </span>
            )}
          </div>
          <label className="textLabel">이름</label>
          <input
            name="name"
            value={register.name}
            onChange={handlerRegister}
            onInput={handlerNameInput}
            className="inputElement"
            type="text"
            placeholder="김뽀삐"
          ></input>
          {!nameValid && (
            <span className="validContext">올바르지 않은 이름입니다.</span>
          )}
          <label className="textLabel">닉네임</label>
          <input
            name="nick"
            value={register.nick}
            onChange={handlerRegister}
            onInput={handlerNickInput}
            className="inputElement"
            type="text"
            placeholder="별명을 알파벳, 한글, 숫자를 10자 이하로 입력해주세요"
          ></input>
          {!nickValid && (
            <span className="validContext">올바르지 않은 닉네임입니다.</span>
          )}
          <div className="skill">
            <label className="skillStack">기술 스택(업무 툴/ 스킬)</label>
            <label className="selectStack">
              나의 기술 스택을 선택해주세요.
            </label>
            <div className="skillList">
              {skillList.map((skill, index) => (
                <div
                  className={
                    skillSelect.find((lan) => lan.id === index && lan.state)
                      ? "skillIconsClick"
                      : "skillIcons"
                  }
                  key={index}
                  value={skill}
                  onClick={(e) => iconClick(e, index)}
                >
                  <SkillIcon
                    className="skillIcon"
                    skill={skill}
                    classType={"bigSkillImg"}
                  />
                  <span className="skillName">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="terms-agree">약관동의</div>
          <div className="terms-all-div">
            <label className="agreeAll-label">
              <Checkbox
                className="agreeAllbox"
                checked={isAllChecked}
                onClick={handlerAllCheck}
              />
              <span>전체동의</span>
              <span className="all-agree-span">
                전체 동의를 선택하시면 아래의 모든 약관에 동의하게 됩니다.
              </span>
            </label>

            <div className="terms-div">
              <label className="terms-label">
                <Checkbox checked={check1} onClick={handlerCheck1} />
                <span className="termsContent">서비스 이용약관</span>
                <Link className="link" to={"#"} onClick={viewTerms}>
                  보기
                </Link>
              </label>

              <label className="privacy-label">
                <Checkbox checked={check2} onClick={handlerCheck2} />
                <span className="privacyContent">개인정보 처리 방침</span>
                <Link className="link" to={"#"} onClick={viewPrivacy}>
                  보기
                </Link>
              </label>
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

      <Backdrop handleClose={handleClose} open={open} />
      <TermsModal
        termsModalClose={termsModalClose}
        openTerms={openTerms}
        setOpenTerms={setOpenTerms}
        handlerModal={handlerModal}
        terms={terms}
        privacy={privacy}
      />
    </div>
  );
};

export default Register;
