import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalPath } from "../../globalPaths";
import "../../styles/user/register.scss";
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
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
    birth: "",
    gender: "M",
    hp: "",
    languagename: [],
  });
  useEffect(() => {
    console.log(register);
  }, [register]);

  /**유효성 검사 */
  const [emailValid, setEmailValid] = useState(null); // 이메일 유효성 상태
  const [passValid, setPassValid] = useState(null); // 비밀번호 유효성 상태
  const [nameValid, setNameValid] = useState(null); // 이름 유효성 상태
  const [nickValid, setNickValid] = useState(null); // 닉네임 유효성 상태
  const [hpValid, setHpValid] = useState(null); // 휴대폰 유효성 상태

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
  /**휴대폰 검사 함수 */
  const isValidHp = (hp) => {
    console.log(hp);
    const hpPattern = /^01[016789]-?\d{3,4}-?\d{4}$/;

    setHpValid(hpPattern.test(hp));
    console.log(hpValid);
  };

  /**적기 시작할 때 유효성검사 */
  const handlerEmailInput = () => {
    setEmailValid(false);
    setDuplicateEmial(null);
  };
  const handlerPassInput = () => {
    setPassValid(false);
  };
  const handlerNameInput = () => {
    setNameValid(false);
  };
  const handlerNickInput = () => {
    setNickValid(false);
    setDuplicateNick(null);
  };
  const handlerHpInput = () => {
    setHpValid(false);
  };

  /**중복검사 */
  const [duplicateEmail, setDuplicateEmial] = useState(null); // 이메일 중복검사 상태
  const [duplicateNick, setDuplicateNick] = useState(null); // 닉네임 중복검사 상태
  const [progressState1, setProgressState1] = useState(null); // progress관리1
  const [progressState2, setProgressState2] = useState(null); // progress관리2
  const [progressState3, setProgressState3] = useState(null); // progress관리3

  /**이메일 중복검사 포커스 아웃 */
  const handlerEmial = (e) => {
    const email = e.target.value;
    if (emailValid) {
      setProgressState1(true);

      setTimeout(() => {
        axios
          .get(`${url}/user/duplicateTest?param=${email}`)
          .then((response) => {
            console.log(response.data);
            if (response.data === 0) {
              /**중복검사 통과 */
              setTimeout(() => {
                setDuplicateEmial(true);
                setProgressState1(false);
              }, 1000);

              /**이메일 인증 */
              axios
                .post(`${url}/user/email-check`, { email: email })
                .then((response) => {
                  console.log(response.data);
                  setEncodedCode(response.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              setDuplicateEmial(false);
              setProgressState1(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);
    }
  };

  /**닉네임 중복검사 포커스 아웃 */
  const handlerNickCheck = (e) => {
    const nick = e.target.value;

    if (nickValid) {
      setProgressState2(true);

      setTimeout(() => {
        axios
          .get(`${url}/user/duplicateTest?param=${nick}`)
          .then((response) => {
            console.log(response.data);
            if (response.data === 0) {
              /**중복검사 통과 */
              setDuplicateNick(true);
              setProgressState2(false);
            } else {
              setDuplicateNick(false);
              setProgressState2(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);
    }
  };

  /**이메일 인증코드 */
  const [emailCode, setEmailCode] = useState(""); //이메일 인증 input state
  const [encodedCode, setEncodedCode] = useState(""); // 인코딩된 인증번호
  const [checkCode, setChecCode] = useState({ result: "" }); // 이메일 인증 결과

  /**인증코드 검사 cange 핸들러 */
  const handlerCheckEmail = (e) => {
    setEmailCode(e.target.value);
  };

  /**인증코드 확인 버튼 */
  const emailCodeBtn = (e) => {
    e.preventDefault();

    setProgressState3(true);

    setTimeout(() => {
      axios
        .post(`${url}/user/check-code`, {
          emailCode: emailCode,
          encodedCode: encodedCode,
        })
        .then((response) => {
          console.log(response.data.result);

          setProgressState3(false);

          setChecCode(response.data);
        })
        .catch((err) => console.log(err));
    }, 2000);
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

    console.log(name);
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
    if (name === "hp") {
      isValidHp(value);
    }
  };

  /**회원가입 버튼 클릭 */
  const handlerSubmitClick = (e) => {
    e.preventDefault();
    const { email, pass, name, nick, birth, hp } = register;

    if (!email) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (!emailValid) {
      alert("이메일이 올바르지 않습니다.");
      return;
    }
    if (!duplicateEmail) {
      alert("중복된 이메일입니다.");
      return;
    }
    if (checkCode.result !== 1) {
      alert("이메일 인증을 진행해주세요.");
      return;
    }
    if (!pass) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passValid) {
      alert("비밀번호가 올바르지 않습니다.");
      return;
    }
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!nameValid) {
      alert("이름이 올바르지 않습니다.");
      return;
    }
    if (!nick) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!nickValid) {
      alert("닉네임이 올바르지 않습니다.");
      return;
    }
    if (!duplicateNick) {
      alert("중복된 닉네임입니다.");
      return;
    }
    if (!birth) {
      alert("생년월일을 입력해주세요.");
      return;
    }
    if (!hp) {
      alert("휴대폰을 입력해주세요.");
      return;
    }
    if (!hpValid) {
      alert("휴대폰이 올바르지 않습니다.");
      return;
    }
    if (inputSkills.length === 0 || inputSkills === undefined) {
      alert("나의 기술 스택을 선택해주세요.");
      return;
    }
    if (!check1) {
      alert("서비스 이용약관에 동의하셔야합니다.");
      return;
    }
    if (!check2) {
      alert("개인정보 처리방침에 동의하셔야합니다.");
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
      }, 3000);
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
  const [inputSkills, setInputSkills] = useState([]);

  /**스킬이 선택된것만 가져오기 */
  useEffect(() => {
    const selectedSkills = skillSelect
      .filter((skill) => skill.state)
      .map((skill) => skill.languagename);
    setInputSkills(selectedSkills);
  }, [skillSelect]);

  /**회원가입 state에 inputSkills 넣기*/
  useEffect(() => {
    setRegister((prev) => ({
      ...prev,
      languagename: inputSkills,
    }));
  }, [inputSkills]);

  /**스킬 리스트 */
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
            languagename: language.languagename,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**스킬 아이콘 클릭 */
  const iconClick = (e, index, skill) => {
    e.preventDefault();
    console.log(skill);

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
            onBlur={handlerEmial}
            type="text"
            placeholder="예시) example@fifo.com"
          ></input>

          {emailValid != null && !emailValid && (
            <span className="validContext">올바르지 않은 이메일입니다.</span>
          )}
          {duplicateEmail !== null && !duplicateEmail && (
            <span className="validContext">이메일이 중복되었습니다.</span>
          )}
          {emailValid && duplicateEmail && (
            <span className="passText">
              사용 가능한 이메일입니다. 이메일 인증을 진행해주세요.
              <form className="emailForm">
                <input
                  type="text"
                  value={emailCode}
                  onChange={handlerCheckEmail}
                  className="emailCodeCheck"
                />
                <input
                  type="submit"
                  onClick={emailCodeBtn}
                  className="emailCodeBtn"
                  value="확인"
                />
                {progressState3 && (
                  <CircularProgress className="progressEmail" size={"20px"} />
                )}
              </form>
            </span>
          )}
          {checkCode.result === 1 && (
            <span className="passText">인증 번호가 확인 되었습니다!</span>
          )}
          {checkCode.result !== null && checkCode.result === 0 && (
            <span className="validContext">인증 번호를 다시 확인해주세요.</span>
          )}

          {progressState1 && (
            <CircularProgress className="progress" size={"30px"} />
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
          </div>
          {passValid != null && !passValid && (
            <span className="validContext">올바르지 않은 비밀번호입니다.</span>
          )}
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
          {nameValid != null && !nameValid && (
            <span className="validContext">올바르지 않은 이름입니다.</span>
          )}

          <label className="textLabel">닉네임</label>
          <input
            name="nick"
            value={register.nick}
            onChange={handlerRegister}
            onInput={handlerNickInput}
            onBlur={handlerNickCheck}
            className="inputElement"
            type="text"
            placeholder="별명을 알파벳, 한글, 숫자를 10자 이하로 입력해주세요"
          ></input>
          {nickValid != null && !nickValid && (
            <span className="validContext">올바르지 않은 닉네임입니다.</span>
          )}
          {duplicateNick != null && !duplicateNick && (
            <span className="validContext">닉네임이 중복되었습니다.</span>
          )}
          {emailValid && duplicateNick && (
            <span className="passText">사용가능한 닉네임입니다.</span>
          )}
          {progressState2 && (
            <CircularProgress className="progress" size={"30px"} />
          )}
          <label className="textLabel">생년월일</label>
          <input
            name="birth"
            value={register.birth}
            onChange={handlerRegister}
            className="inputElement"
            type="date"
          ></input>
          <label className="textLabel">성별</label>
          <select
            name="gender"
            value={register.gender}
            onChange={handlerRegister}
            className="inputElement"
          >
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
          <label className="textLabel">휴대폰</label>
          <input
            name="hp"
            value={register.hp}
            onChange={handlerRegister}
            onInput={handlerHpInput}
            placeholder="'-'를 포함하여 작성해주세요."
            className="inputElement"
            type="text"
          ></input>
          {hpValid != null && !hpValid && (
            <span className="validContext">올바르지 않은 휴대폰입니다.</span>
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
                  onClick={(e) => iconClick(e, index, skill)}
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
