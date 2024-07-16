import React, { useEffect, useRef, useState } from "react";
import "../../styles/user/myProfile.scss";
import { Button } from "@mui/material";
import { RootUrl } from "../../api/RootUrl";
import { useSelector } from "react-redux";
import SkillIcon from "../gathering/SkillIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faFloppyDisk,
  faPencil,
  faPlus,
  faPlusCircle,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { globalPath } from "../../globalPaths";
import moment from "moment/moment";
import axios from "axios";
import { differenceInYears } from "date-fns";

const MyProfile = () => {
  // 스킬 추가 트리거
  const [skillTriger, SetSkillTriger] = useState(false);

  const authSlice = useSelector((state) => state.authSlice);

  const userno = authSlice.userno;

  const url = globalPath.path;

  /** 유저 정보 */
  const [information, setInformation] = useState({
    name: "",
    nick: "",
    email: "",
    hp: "",
    region: "",
    birth: "",
    gender: "",
    rdate: "",
    languagename: [],
    levels: [],
  });

  // useEffect(() => {
  //   console.log(information);
  // }, [information]);

  /**나이 계산하기 */
  const calcAge = () => {
    const date = new Date();
    return differenceInYears(date, information.birth);
  };
  const age = calcAge();

  /**유저 정보 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/user/getProfile?userno=${userno}`)
      .then((response) => {
        setInformation(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/user/getProfile?userno=${userno}`)
      .then((response) => {
        setInformation(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [skillTriger]);

  /**스킬 추가할 때 바로 반영 */
  //useEffect(() => {}, []);
  /** input 입력 활성화 상태 관리 useState */
  const [inputModify, setInputModify] = useState({
    name: false,
    nick: false,
    email: false,
    hp: false,
    region: false,
    skill: false,
  });

  /**스킬 리스트 가져오기 */
  const [skillList, setSkillList] = useState([]);
  const [skillSelect, setSkillSelect] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/user/distinctLanguage?userno=${authSlice.userno}`)
      .then((response) => {
        console.log(response.data);
        setSkillList(response.data);
        setSkillSelect(
          response.data.map((language, index) => ({
            id: index,
            state: false,
            languagename: language,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [skillTriger]);

  const fileInputRef = useRef(null);
  /** 프로필 사진 수정 */
  const modifythumb = () => {
    fileInputRef.current.click();
  };

  /** 기본 정보 편집 input 활성 */
  const changeMyInfo = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    input.style.border = "1px solid #111";
    input.readOnly = false;
    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  const changeMyRegion = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    // div 생성
    const div = document.createElement("div");
    div.id = targetId + "Div";

    // checkbox 생성
    const options = [
      "서울",
      "경기",
      "인천",
      "부산",
      "대구",
      "대전",
      "광주",
      "울산",
      "세종",
      "강원",
      "경남",
      "경북",
      "전남",
      "전북",
      "충남",
      "충북",
      "제주",
      "전국",
    ];
    options.forEach((optionText) => {
      const label = document.createElement("label");
      label.classList.add("regionLabel");

      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.value = optionText;
      checkbox.classList.add("region-checkbox");

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(optionText));

      div.appendChild(label);
    });

    // input을 div로 교체
    input.parentNode.replaceChild(div, input);

    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  /** 기본 정보 수정 */
  const inputMyInfo = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({ ...prev, [name]: value }));
    console.log("information : ", information);

    // 유효성 검사 넣어주세요
  };

  const [emailValid, setEmailValid] = useState(null);
  const [nickValid, setNickValid] = useState(null);
  const [hpValid, setHpValid] = useState(null);

  /**이메일 검사 함수 */
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(email));
  };

  /**닉네임 검사 함수 */
  const isValidNick = (nick) => {
    const nickPattern =
      /^(?=.*[가-힣]{2,})(?!.*[^\가-힣a-zA-Z0-9]).{2,10}$|^(?=.*[a-zA-Z]{4,})(?!.*[^\가-힣a-zA-Z0-9]).{4,10}$/;
    setNickValid(nickPattern.test(nick));
  };
  /**연락처 검사 함수 */
  const isValidHp = (hp) => {
    const hpPattern = /^\d{3}-\d{3,4}-\d{4}$/;
    setHpValid(hpPattern.test(hp));
  };

  /** 기본 정보 수정 저장 */
  const saveMyinfo = async (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    console.log(input.value);
    console.log(targetId);

    try {
      const response = await axios.post(
        `${url}/user/update?userno=${authSlice.userno}`,
        {
          type: targetId,
          information: input.value,
        }
      );
      if (response.data) {
        input.style.border = "1px solid white";
        input.readOnly = true;
        alert("수정되었습니다.");
      } else {
        alert("수정에 실패했습니다.");
      }

      setInputModify((prev) => ({ ...prev, [targetId]: false }));
    } catch (error) {
      console.log(error);
    }
  };

  /** 내 스킬 편집 input 활성화 */
  const changeMySkill = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  /** 내 스킬 편집 */
  const iconClick = (e, index) => {
    e.preventDefault();

    setSkillSelect((prev) =>
      prev.map((lan) =>
        lan.id === index ? { ...lan, state: !lan.state } : lan
      )
    );
  };

  /**추가 클릭시 선택한 스킬 추가 */
  const clickAdd = (e) => {
    e.preventDefault();

    axios
      .post(`${url}/user/addSkill?userno=${authSlice.userno}`, inputSkill)
      .then((response) => {
        console.log(response.data);
        alert("추가 되었습니다.");
        SetSkillTriger(!skillTriger);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickCancle = (e) => {
    e.preventDefault();

    setInputModify((prev) => ({
      ...prev,
      skill: false,
    }));
  };

  /** 내 스킬 추가 저장 */
  const [inputSkill, setInputSkill] = useState([]);

  /**선택한 스킬 추가하기 */
  useEffect(() => {
    const selectedSkill = skillSelect
      .filter((skill) => skill.state)
      .map((skill) => skill.languagename);

    setInputSkill(selectedSkill);
  }, [skillSelect]);

  useEffect(() => {
    console.log(inputSkill);
  }, [inputSkill]);

  return (
    <>
      <main>
        <div id="contentArea" style={{ marginTop: "20px" }}>
          <div className="cntColumn myProfile">
            <h1>내 정보 수정</h1>

            <h2>기본 정보</h2>

            <div className="basicInfo">
              <div className="myThumb">
                <img src="../../images/ppoppi.png" alt="" />

                <label htmlFor="thumb">
                  <FontAwesomeIcon
                    icon={faPencil}
                    size="lg"
                    color="#FF0000"
                    onClick={modifythumb}
                  />
                </label>
                <input type="file" id="thumb" ref={fileInputRef} />
              </div>

              <div className="myInfo">
                <label htmlFor="">
                  <h2>{information.name}</h2>
                  <h4>{information.gender === "M" ? "남자" : "여자"}</h4>
                  <h4>{age}세</h4>
                  <h5>{moment(information.rdate).format("YYYY-MM-DD")} 가입</h5>
                </label>

                <label htmlFor="">
                  <h3>닉네임 : </h3>
                  <input
                    type="text"
                    id="nick"
                    name="nick"
                    value={information.nick}
                    onChange={(e) => inputMyInfo(e)}
                    readOnly
                  />
                  {inputModify.nick ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="nick"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="nick"
                      onClick={(e) => changeMyInfo(e)}
                    />
                  )}
                </label>
                {nickValid != null && !nickValid && (
                  <span className="validContext">
                    올바르지 않은 닉네임입니다.
                  </span>
                )}
                <label htmlFor="">
                  <h3>이메일 : </h3>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={information.email}
                    onChange={(e) => inputMyInfo(e)}
                    readOnly
                  />
                  {inputModify.email ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="email"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="email"
                      onClick={(e) => changeMyInfo(e)}
                    />
                  )}
                </label>
                {emailValid != null && !emailValid && (
                  <span className="validContext">
                    올바르지 않은 이메일입니다.
                  </span>
                )}
                <label htmlFor="">
                  <h3>연락처 : </h3>
                  <input
                    type="text"
                    id="hp"
                    name="hp"
                    value={information.hp}
                    onChange={(e) => inputMyInfo(e)}
                    placeholder="정보를 입력해주세요"
                    readOnly
                  />
                  {inputModify.hp ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="hp"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="hp"
                      onClick={(e) => changeMyInfo(e)}
                    />
                  )}
                </label>
                {hpValid != null && !hpValid && (
                  <span className="validContext">
                    -를 포함하여 작성해주세요.
                  </span>
                )}
                <label htmlFor="">
                  <h3>활동지역 : </h3>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={information.region}
                    onChange={(e) => inputMyInfo(e)}
                    placeholder="정보를 입력해주세요"
                    readOnly
                  />
                  {inputModify.region ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="region"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="region"
                      onClick={(e) => changeMyRegion(e)}
                    />
                  )}
                </label>
              </div>
            </div>

            <h2>내 스킬</h2>
            <div className="mySkill">
              <div className="inputSkill">
                {inputModify.skill ? (
                  <div className="skillIconList">
                    {skillList
                      .filter(
                        (selected) =>
                          !information.languagename.includes(selected)
                      )
                      .map((skill, index) => (
                        <div
                          className={
                            skillSelect.find(
                              (lan) => lan.id === index && lan.state
                            )
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
                    <span>
                      <button className="btn add-btn" onClick={clickAdd}>
                        추가
                      </button>
                      <button className="btn cancel-btn" onClick={clickCancle}>
                        취소
                      </button>
                    </span>
                  </div>
                ) : (
                  <label
                    htmlFor=""
                    data-target-id="skill"
                    onClick={(e) => changeMySkill(e)}
                  >
                    <p>내 기술 스택 추가 {"  "}</p>

                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      size="lg"
                      color="#7b7b7b"
                    />
                  </label>
                )}
              </div>

              <div className="skillList">
                {information.languagename &&
                  information.languagename.map((skill, index) => (
                    <div>
                      <SkillIcon skill={skill} classType={"bigSkillImg"} />
                      <p>{skill}</p>
                      <p>Level {information.levels[index]}</p>
                    </div>
                  ))}
              </div>
            </div>
            <h2>내 경력</h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyProfile;
